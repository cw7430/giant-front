import type { H3Event } from 'h3';

import { serverFetch, type FetchOptions } from './server-fetch';

export const apiGet = async <T>(
  event: H3Event,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
  options?: FetchOptions,
): Promise<T> => {
  return serverFetch<T>(event, url, {
    method: 'GET',
    query: params,
    ...options,
  });
};

export const apiPost = async <
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  B extends Record<string, any> | BodyInit = Record<string, any>,
>(
  event: H3Event,
  url: string,
  body?: B,
  options?: FetchOptions,
): Promise<T> => {
  return serverFetch<T>(event, url, {
    method: 'POST',
    body,
    ...options,
  });
};

export const apiPut = async <
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  B extends Record<string, any> | BodyInit = Record<string, any>,
>(
  event: H3Event,
  url: string,
  body?: B,
  options?: FetchOptions,
): Promise<T> => {
  return serverFetch<T>(event, url, {
    method: 'PUT',
    body,
    ...options,
  });
};

export const apiPatch = async <
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  B extends Record<string, any> | BodyInit = Record<string, any>,
>(
  event: H3Event,
  url: string,
  body?: B,
  options?: FetchOptions,
): Promise<T> => {
  return serverFetch<T>(event, url, {
    method: 'PATCH',
    body,
    ...options,
  });
};

export const apiDelete = async <T = void>(
  event: H3Event,
  url: string,
  options?: FetchOptions,
): Promise<T> => {
  return serverFetch<T>(event, url, {
    method: 'DELETE',
    ...options,
  });
};
