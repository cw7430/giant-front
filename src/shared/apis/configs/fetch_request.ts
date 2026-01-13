import serverFetch from './server_fetch';

export const apiGet = async <T>(
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
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
  });
};

export const apiPost = async <T, B = unknown>(
  url: string,
  body: B,
): Promise<T | undefined> => {
  return serverFetch<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const apiPut = async <T, B = unknown>(
  url: string,
  body: B,
): Promise<T | undefined> => {
  return serverFetch<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

export const apiDelete = async <T = void>(
  url: string,
): Promise<T | undefined> => {
  return serverFetch<T>(url, {
    method: 'DELETE',
  });
};
