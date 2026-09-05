/** Cloudflare Worker entry point for the Basement Boys site. */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
}

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "upgrade-insecure-requests",
].join("; ");

function secureResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("content-security-policy", CONTENT_SECURITY_POLICY);
  headers.set("cross-origin-opener-policy", "same-origin");
  headers.set("permissions-policy", "camera=(), geolocation=(), microphone=(), payment=(), usb=()");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("strict-transport-security", "max-age=300");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function canonicalRedirect(url: URL): Response | null {
  if (url.hostname === "www.basementboys.org") {
    url.protocol = "https:";
    url.hostname = "basementboys.org";
    url.port = "";
    return Response.redirect(url, 308);
  }
  if (url.hostname === "basementboys.org" && url.protocol !== "https:") {
    url.protocol = "https:";
    url.port = "";
    return Response.redirect(url, 308);
  }
  return null;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const redirect = canonicalRedirect(url);
    if (redirect) return secureResponse(redirect);
    if (url.pathname === "/_vinext/image") {
      return secureResponse(new Response("Not found", { status: 404 }));
    }

    // Keep static-file precedence inside the redirect/header boundary. Vinext's
    // public-file signals do not include generated client JavaScript and CSS.
    if (env.ASSETS && (request.method === "GET" || request.method === "HEAD")) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return secureResponse(asset);
      await asset.body?.cancel();
    }

    return secureResponse(await handler.fetch(request, env, ctx));
  },
};

export default worker;
