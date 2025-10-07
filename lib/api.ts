// lib/api.ts

// Unified API client for UPAK frontend.  Automatically prefixes paths with NEXT_PUBLIC_API,
// sends cookies via credentials: 'include', and supports both JSON and URL-encoded form bodies.

export const API = (process.env.NEXT_PUBLIC_API || '').replace(/\/+$/, '');

export type ApiOptions = RequestInit & {
  json?: any;
  form?: Record<string, string>;
};

export async function api<T = any>(path: string, opts: ApiOptions = {}): Promise<T> {
  // Ensure leading slash once, and prefix with API base
  const url = `${API}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers = new Headers(opts.headers);
  let body: BodyInit | undefined;

  if (opts.form) {
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    body = new URLSearchParams(opts.form as Record<string, string>);
  } else if (opts.json !== undefined) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(opts.json);
  }

  const method = (opts.method || (opts.form || opts.json ? 'POST' : 'GET')).toUpperCase();

  const res = await fetch(url, {
    ...opts,
    method,
    headers,
    body,
    credentials: 'include', // always send cookies for httpOnly auth
  });

  if (res.status === 401) {
    // Caller should handle unauthorized (e.g., redirect to /login)
    throw new Error('unauthorized');
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json() as Promise<T>;
  }

  // Return raw text if not JSON
  return res.text() as unknown as Promise<T>;
}

// Backwards compatibility wrappers
export async function fetchJSON<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  return api<T>(path, init);
}

export async function fetchAuthJSON<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  return api<T>(path, init);
}
