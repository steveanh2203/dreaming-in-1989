import { createServer } from 'node:http'
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, 'data')
const dbPath = path.join(dataDir, 'auth-db.json')
const port = Number(process.env.AUTH_PORT ?? 8789)
const sessionCookieName = 'di1989_session'
const sessionMaxAgeMs = 1000 * 60 * 60 * 24 * 7
const resetTokenMaxAgeMs = 1000 * 60 * 30

const defaultDb = {
  users: [],
  sessions: [],
  resetTokens: [],
}

const json = (res, status, body, headers = {}) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    ...headers,
  })
  res.end(JSON.stringify(body))
}

const parseCookies = (cookieHeader = '') =>
  Object.fromEntries(
    cookieHeader
      .split(';')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [key, ...value] = entry.split('=')
        return [decodeURIComponent(key), decodeURIComponent(value.join('='))]
      }),
  )

const parseBody = async (req) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

const loadDb = async () => {
  try {
    const raw = await readFile(dbPath, 'utf8')
    return { ...defaultDb, ...JSON.parse(raw) }
  } catch {
    await mkdir(dataDir, { recursive: true })
    await writeFile(dbPath, JSON.stringify(defaultDb, null, 2))
    return { ...defaultDb }
  }
}

const saveDb = async (db) => {
  await mkdir(dataDir, { recursive: true })
  await writeFile(dbPath, JSON.stringify(db, null, 2))
}

const normalizeEmail = (email) => String(email ?? '').trim().toLowerCase()

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString('hex')
  const hash = await scrypt(String(password), salt, 64)
  return `${salt}:${hash.toString('hex')}`
}

const verifyPassword = async (password, storedHash) => {
  const [salt, expectedHex] = String(storedHash).split(':')
  if (!salt || !expectedHex) return false
  const actual = await scrypt(String(password), salt, 64)
  const expected = Buffer.from(expectedHex, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

const publicCustomer = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  joined: user.joined,
  addresses: user.addresses ?? [],
})

const pruneExpired = (db) => {
  const now = Date.now()
  db.sessions = db.sessions.filter((session) => session.expiresAt > now)
  db.resetTokens = db.resetTokens.filter((token) => token.expiresAt > now && !token.usedAt)
}

const createSession = (db, userId) => {
  const token = randomBytes(32).toString('hex')
  db.sessions.push({
    token,
    userId,
    createdAt: Date.now(),
    expiresAt: Date.now() + sessionMaxAgeMs,
  })
  return token
}

const getAuthenticatedUser = (db, req) => {
  const cookies = parseCookies(req.headers.cookie)
  const session = db.sessions.find((entry) => entry.token === cookies[sessionCookieName])
  if (!session || session.expiresAt <= Date.now()) return null
  return db.users.find((user) => user.id === session.userId) ?? null
}

const sessionCookie = (token) =>
  `${sessionCookieName}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(sessionMaxAgeMs / 1000)}`

const clearSessionCookie = () => `${sessionCookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`

const requirePassword = (password) => {
  const value = String(password ?? '')
  const hasLength = value.length >= 8
  const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((pattern) => pattern.test(value)).length
  return hasLength && variety >= 3
}

const routes = {
  'POST /api/auth/register': async (req, res, db) => {
    const body = await parseBody(req)
    const email = normalizeEmail(body.email)
    const name = String(body.name ?? '').trim()
    const password = String(body.password ?? '')

    if (!name || !email || !password) return json(res, 400, { error: 'Name, email, and password are required.' })
    if (!requirePassword(password)) return json(res, 400, { error: 'Password is not strong enough.' })
    if (db.users.some((user) => user.email === email)) return json(res, 409, { error: 'An account already exists for this email.' })

    const user = {
      id: randomBytes(12).toString('hex'),
      name,
      email,
      passwordHash: await hashPassword(password),
      joined: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      addresses: [],
      createdAt: Date.now(),
      lastSignInAt: Date.now(),
    }
    db.users.push(user)
    const token = createSession(db, user.id)
    await saveDb(db)
    return json(res, 201, { customer: publicCustomer(user) }, { 'Set-Cookie': sessionCookie(token) })
  },

  'POST /api/auth/sign-in': async (req, res, db) => {
    const body = await parseBody(req)
    const email = normalizeEmail(body.email)
    const user = db.users.find((entry) => entry.email === email)
    if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
      return json(res, 401, { error: 'Email or password is incorrect.' })
    }

    user.lastSignInAt = Date.now()
    const token = createSession(db, user.id)
    await saveDb(db)
    return json(res, 200, { customer: publicCustomer(user) }, { 'Set-Cookie': sessionCookie(token) })
  },

  'GET /api/auth/me': async (req, res, db) => {
    const user = getAuthenticatedUser(db, req)
    return json(res, 200, { customer: user ? publicCustomer(user) : null })
  },

  'POST /api/auth/logout': async (req, res, db) => {
    const cookies = parseCookies(req.headers.cookie)
    db.sessions = db.sessions.filter((session) => session.token !== cookies[sessionCookieName])
    await saveDb(db)
    return json(res, 200, { ok: true }, { 'Set-Cookie': clearSessionCookie() })
  },

  'POST /api/auth/change-password': async (req, res, db) => {
    const user = getAuthenticatedUser(db, req)
    if (!user) return json(res, 401, { error: 'Please sign in again.' })
    const body = await parseBody(req)

    if (!(await verifyPassword(body.currentPassword, user.passwordHash))) {
      return json(res, 400, { error: 'Current password is incorrect.' })
    }
    if (!requirePassword(body.newPassword)) return json(res, 400, { error: 'New password is not strong enough.' })

    user.passwordHash = await hashPassword(body.newPassword)
    db.sessions = db.sessions.filter((session) => session.userId !== user.id)
    const token = createSession(db, user.id)
    await saveDb(db)
    return json(res, 200, { customer: publicCustomer(user) }, { 'Set-Cookie': sessionCookie(token) })
  },

  'POST /api/auth/request-reset': async (req, res, db) => {
    const body = await parseBody(req)
    const email = normalizeEmail(body.email)
    const user = db.users.find((entry) => entry.email === email)

    if (!user) return json(res, 200, { ok: true })

    const token = randomBytes(32).toString('hex')
    db.resetTokens.push({
      token,
      userId: user.id,
      createdAt: Date.now(),
      expiresAt: Date.now() + resetTokenMaxAgeMs,
      usedAt: null,
    })
    await saveDb(db)
    console.log(`[auth] reset link for ${email}: /reset-password?token=${token}`)
    return json(res, 200, {
      ok: true,
      devResetToken: token,
      resetPath: `/reset-password?token=${token}`,
    })
  },

  'POST /api/auth/reset-password': async (req, res, db) => {
    const body = await parseBody(req)
    const resetToken = db.resetTokens.find((entry) => entry.token === body.token)
    if (!resetToken || resetToken.usedAt || resetToken.expiresAt <= Date.now()) {
      return json(res, 400, { error: 'Reset token is invalid or expired.' })
    }
    if (!requirePassword(body.newPassword)) return json(res, 400, { error: 'New password is not strong enough.' })

    const user = db.users.find((entry) => entry.id === resetToken.userId)
    if (!user) return json(res, 400, { error: 'Reset token is invalid.' })

    user.passwordHash = await hashPassword(body.newPassword)
    resetToken.usedAt = Date.now()
    db.sessions = db.sessions.filter((session) => session.userId !== user.id)
    await saveDb(db)
    return json(res, 200, { ok: true })
  },
}

const server = createServer(async (req, res) => {
  const routeKey = `${req.method} ${new URL(req.url, `http://${req.headers.host}`).pathname}`
  const handler = routes[routeKey]

  if (!handler) return json(res, 404, { error: 'Not found' })

  try {
    const db = await loadDb()
    pruneExpired(db)
    return await handler(req, res, db)
  } catch (error) {
    console.error('[auth] request failed', error)
    return json(res, 500, { error: 'Auth service failed.' })
  }
})

server.listen(port, () => {
  console.log(`[auth] server listening on http://127.0.0.1:${port}`)
})
