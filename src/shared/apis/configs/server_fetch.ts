import ApiError from './api_error';

const API_BASE_URL = process.env.API_URL!;

const serverFetch = async <T>(
  input: string,
  init?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(
      data?.code ?? 'ISE',
      data?.message ?? '서버에서 문제가 발생했습니다.',
      data?.errors,
    );
  }

  return data?.result ?? data;
};

export default serverFetch;
