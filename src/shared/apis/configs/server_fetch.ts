import ApiError from './api_error';

const API_BASE_URL = process.env.API_URL!;

const serverFetch = async <T>(
  input: string,
  init?: RequestInit,
): Promise<T | undefined> => {
  const res = await fetch(`${API_BASE_URL}${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    if (data?.code && data?.message) {
      throw new ApiError(
        data.code,
        data.message,
        Array.isArray(data.errors) ? data.errors : undefined,
      );
    }
    throw new Error('Unknown API Error');
  }

  return data.result;
};

export default serverFetch;
