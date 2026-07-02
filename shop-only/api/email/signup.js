import { handleIntegrationRoute } from '../../server/vercel-handler.js'

export default function handler(req, res) {
  return handleIntegrationRoute(req, res, '/api/email/signup')
}
