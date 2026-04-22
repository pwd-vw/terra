interface Fetcher {
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
}

interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/')) {
      return handleAPI(url)
    }

    return env.ASSETS.fetch(request)
  },
} as { fetch(request: Request, env: Env): Promise<Response> }

function handleAPI(url: URL): Response {
  if (url.pathname === '/api/v1/status') {
    return Response.json({
      service: 'terra',
      version: '0.1',
      phase: 'P0',
      timestamp: new Date().toISOString(),
    })
  }

  return Response.json({ error: 'Not found' }, { status: 404 })
}
