import test from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const serverPath = fileURLToPath(new URL('./auth-server.js', import.meta.url))

const startAuthServer = async (extraEnv = {}) => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'di1989-auth-test-'))
  const port = 19000 + Math.floor(Math.random() * 1000)
  const child = spawn(process.execPath, [serverPath], {
    env: {
      ...process.env,
      AUTH_DB_PATH: path.join(tempDir, 'auth-db.json'),
      AUTH_PORT: String(port),
      AUTH_HOST: '127.0.0.1',
      ...extraEnv,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  const cleanup = async () => {
    child.kill('SIGTERM')
    await rm(tempDir, { recursive: true, force: true })
  }

  await Promise.race([
    once(child.stdout, 'data'),
    once(child, 'exit').then(([code]) => {
      throw new Error(`auth server exited early with code ${code}`)
    }),
  ])

  return { baseUrl: `http://127.0.0.1:${port}`, cleanup }
}

const postJson = async (baseUrl, pathName, body) => {
  const response = await fetch(`${baseUrl}${pathName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return { response, body: await response.json() }
}

test('request-reset does not expose reset tokens unless explicitly enabled', async () => {
  const { baseUrl, cleanup } = await startAuthServer()
  try {
    await postJson(baseUrl, '/api/auth/register', {
      name: 'Reset Tester',
      email: 'reset@example.com',
      password: 'StrongPass1!',
    })

    const { body } = await postJson(baseUrl, '/api/auth/request-reset', {
      email: 'reset@example.com',
    })

    assert.deepEqual(body, { ok: true })
    assert.equal(Object.hasOwn(body, 'devResetToken'), false)
    assert.equal(Object.hasOwn(body, 'resetPath'), false)
  } finally {
    await cleanup()
  }
})

test('request-reset dev token exposure requires AUTH_EXPOSE_RESET_TOKEN=true', async () => {
  const { baseUrl, cleanup } = await startAuthServer({ AUTH_EXPOSE_RESET_TOKEN: 'true' })
  try {
    await postJson(baseUrl, '/api/auth/register', {
      name: 'Dev Reset Tester',
      email: 'dev-reset@example.com',
      password: 'StrongPass1!',
    })

    const { body } = await postJson(baseUrl, '/api/auth/request-reset', {
      email: 'dev-reset@example.com',
    })

    assert.equal(body.ok, true)
    assert.match(body.devResetToken, /^[a-f0-9]{64}$/)
    assert.match(body.resetPath, /^\/reset-password\?token=[a-f0-9]{64}$/)
  } finally {
    await cleanup()
  }
})
