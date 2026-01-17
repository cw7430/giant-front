import serverFetch from './server_fetch';
import { type FetchOptions } from './server_fetch';

export const apiGet = async <T>(
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: FetchOptions,
): Promise<T | undefined> => {
  const query = params
    ? `?${new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      )}`
    : '';

  return serverFetch<T>(`${url}${query}`, {
    method: 'GET',
    ...options,
  });
};

export const apiPost = async <T, B = unknown>(
  url: string,
  body: B,
  options?: FetchOptions,
): Promise<T | undefined> => {
  return serverFetch<T>(url, {
    method: 'POST',
    ...options,
    body: JSON.stringify(body),
  });
};

export const apiPut = async <T, B = unknown>(
  url: string,
  body: B,
  options?: FetchOptions,
): Promise<T | undefined> => {
  return serverFetch<T>(url, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(body),
  });
};

export const apiDelete = async <T = void>(
  url: string,
  options?: FetchOptions,
): Promise<T | undefined> => {
  return serverFetch<T>(url, {
    method: 'DELETE',
    ...options,
  });
};
