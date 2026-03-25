import { FetchError } from 'ofetch';
import type { H3Event } from 'h3';
import type { NitroFetchOptions, AvailableRouterMethod } from 'nitropack';

import { ApiError } from '~~/layers/base/shared/configs/api-error';

type CacheStrategy =
  | { type: 'no-store' }
  | { type: 'force-cache' }
  | { type: 'revalidate'; seconds: number }
  | { type: 'tags'; tags: string[] };

type AuthType = 'access' | 'refresh' | 'none';

export interface FetchOptions extends Omit<
  NitroFetchOptions<string, AvailableRouterMethod<string>>,
  'baseURL'
> {
  authType?: AuthType;
  cacheStrategy?: CacheStrategy;
}

export const serverFetch = async <T>(
  event: H3Event,
  path: string,
  options: FetchOptions = {},
): Promise<T> => {
  const config = useRuntimeConfig();
  const { authType = 'none', cacheStrategy, ...init } = options;

  let bearerToken: string | undefined;
  if (authType !== 'none') {
    const cookieKey = authType === 'access' ? 'accessToken' : 'refreshToken';
    bearerToken = getCookie(event, cookieKey) || '';

    if (!bearerToken) {
      throw new ApiError('UA', '로그인이 필요합니다.');
    }
  }

  try {
    return await $fetch<T>(path, {
      baseURL: config.apiUrl,
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
        ...init.headers,
      },
    });
  } catch (err) {
    if (err instanceof FetchError) {
      throw new ApiError(
        err.data?.code ?? 'ISE',
        err.data?.message ?? '서버에서 문제가 발생했습니다.',
        err.data?.errors,
      );
    }

    throw new ApiError('ISE', '서버에서 문제가 발생했습니다.');
  }
};
