export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    // API routes
    if (url.pathname === '/api/hello') {
      return Response.json({
        message: '🟢 Worker API is live!',
        timestamp: new Date().toISOString(),
      })
    }

    // All other routes → serve the Vue SPA
    return new Response('Not found', { status: 404 })
  },
} as { fetch(request: Request): Promise<Response> }