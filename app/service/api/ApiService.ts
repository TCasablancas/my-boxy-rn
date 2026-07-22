type PrimitiveQueryValue = string | number | boolean;

export type QueryParams = Record<
  string,
  PrimitiveQueryValue | PrimitiveQueryValue[] | null | undefined
>;

export interface ApiRequestOptions extends Omit<RequestInit, 'body' | 'method' | 'headers'> {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  query?: QueryParams;
  timeoutMs?: number;
}

export interface ApiClientConfig {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  getToken?: () => Promise<string | null>;
}

export class ApiError extends Error {
  status: number;
  method: string;
  url: string;
  details: unknown;

  constructor(params: { message: string; status: number; method: string; url: string; details?: unknown }) {
    super(params.message);
    this.name = 'ApiError';
    this.status = params.status;
    this.method = params.method;
    this.url = params.url;
    this.details = params.details;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeBaseUrl(baseUrl?: string) {
  if (!baseUrl) return '';
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

function normalizePath(path: string) {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
}

function buildUrl(baseUrl: string, path: string, query?: QueryParams) {
  const url = `${baseUrl}${normalizePath(path)}`;
  if (!query || Object.keys(query).length === 0) return url;

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((currentValue) => params.append(key, String(currentValue)));
      return;
    }

    params.append(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
}

function shouldSerializeJson(body: unknown) {
  if (body === null || body === undefined) return false;
  if (typeof FormData !== 'undefined' && body instanceof FormData) return false;
  if (typeof Blob !== 'undefined' && body instanceof Blob) return false;
  if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) return false;
  return typeof body === 'object';
}

function extractErrorMessage(status: number, payload: unknown) {
  if (isRecord(payload)) {
    const candidate = payload.message ?? payload.error ?? payload.detail;
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate;
    }
  }

  return `Request failed with status ${status}`;
}

function parseJsonSafely(rawBody: string): unknown {
  if (!rawBody) return null;

  try {
    return JSON.parse(rawBody);
  } catch {
    return rawBody;
  }
}

async function parseResponse(response: Response, method: string) {
  const rawBody = await response.text();
  const parsedBody = parseJsonSafely(rawBody);

  if (!response.ok) {
    throw new ApiError({
      message: extractErrorMessage(response.status, parsedBody),
      status: response.status,
      method,
      url: response.url,
      details: parsedBody,
    });
  }

  return parsedBody;
}

function mergeHeaders(...headersList: Array<Record<string, string> | undefined>) {
  return headersList.reduce<Record<string, string>>((acc, currentHeaders) => {
    if (!currentHeaders) return acc;
    return { ...acc, ...currentHeaders };
  }, {});
}

export function createApiClient(config: ApiClientConfig = {}) {
  const normalizedBaseUrl = normalizeBaseUrl(config.baseUrl);
  const staticDefaultHeaders = config.defaultHeaders ?? {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function request<TResponse>(path: string, options: ApiRequestOptions = {}): Promise<TResponse> {
    const method = options.method ?? 'GET';
    const timeoutMs = options.timeoutMs ?? 15000;
    const url = buildUrl(normalizedBaseUrl, path, options.query);

    const token = config.getToken ? await config.getToken() : null;
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;

    const headers = mergeHeaders(staticDefaultHeaders, authHeaders, options.headers);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const body = shouldSerializeJson(options.body)
        ? JSON.stringify(options.body)
        : (options.body as BodyInit_ | null | undefined);

      if (!shouldSerializeJson(options.body)) {
        delete headers['Content-Type'];
      }

      const response = await fetch(url, {
        ...options,
        method,
        headers,
        body,
        signal: options.signal ?? controller.signal,
      });

      return (await parseResponse(response, method)) as TResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError({
          message: `Request timed out after ${timeoutMs}ms`,
          status: 408,
          method,
          url,
          details: null,
        });
      }

      const fallbackMessage = error instanceof Error ? error.message : 'Unknown request error';
      throw new ApiError({
        message: fallbackMessage,
        status: 0,
        method,
        url,
        details: error,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return {
    request,
    get: <TResponse>(path: string, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}) =>
      request<TResponse>(path, { ...options, method: 'GET' }),
    post: <TResponse>(path: string, body?: unknown, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}) =>
      request<TResponse>(path, { ...options, method: 'POST', body }),
    put: <TResponse>(path: string, body?: unknown, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}) =>
      request<TResponse>(path, { ...options, method: 'PUT', body }),
    patch: <TResponse>(path: string, body?: unknown, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}) =>
      request<TResponse>(path, { ...options, method: 'PATCH', body }),
    delete: <TResponse>(path: string, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}) =>
      request<TResponse>(path, { ...options, method: 'DELETE' }),
  };
}