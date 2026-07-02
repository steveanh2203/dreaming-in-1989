import { Buffer } from 'node:buffer'
import process from 'node:process'
import { createIntegrationRoutes } from './integrations.js'

const json = (res, status, body, headers = {}) => {
  res.statusCode = status
  for (const [key, value] of Object.entries({
    'Content-Type': 'application/json',
    ...headers,
  })) {
    res.setHeader(key, value)
  }
  res.end(JSON.stringify(body))
}

const parseBody = async (req) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body
  if (typeof req.body === 'string') return req.body ? JSON.parse(req.body) : {}
  if (Buffer.isBuffer(req.body)) return req.body.length ? JSON.parse(req.body.toString('utf8')) : {}

  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

const routes = createIntegrationRoutes({ json, parseBody })

export const handleIntegrationRoute = async (req, res, routePath) => {
  const routeKey = `${req.method} ${routePath}`
  const handler = routes[routeKey]

  if (!handler) return json(res, 404, { error: 'Not found' })

  try {
    return await handler(req, res)
  } catch (error) {
    console.error('[api] request failed', error)
    return json(res, error.status || 500, {
      error: error.message || 'API service failed.',
      details: process.env.NODE_ENV === 'production' ? undefined : error.body,
    })
  }
}
