import type { H3Event } from 'h3';

import type { ApiSuccessDtoWithResult } from '~~/layers/base/shared/schema/api';
import {
  signInAndRefreshResponseSchemaForServer,
  type SignInAndRefreshResponseDtoForServer,
} from '~~/layers/auth/contract/schema/shared';
import { ApiError } from '~~/layers/base/shared/configs/api-error';

export const signInAndRefresh = (
  event: H3Event,
  response: ApiSuccessDtoWithResult<SignInAndRefreshResponseDtoForServer>,
) => {
  const config = useRuntimeConfig();

  const validation = signInAndRefreshResponseSchemaForServer.safeParse(
    response.result,
  );

  if (!validation.success) {
    throw new ApiError('ISE', '서버 응답 형식이 올바르지 않습니다.');
  }

  const result = validation.data;

  const refreshMaxAge = result.isAuto
    ? Math.max(
        0,
        Math.floor((result.refreshTokenExpiresAtMs - Date.now()) / 1000),
      )
    : undefined;

  const isSecure = config.public.appEnv !== 'local';

  setCookie(event, 'accessToken', result.accessToken, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: isSecure,
  });

  setCookie(event, 'refreshToken', result.refreshToken, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: isSecure,
    ...(refreshMaxAge !== undefined && { maxAge: refreshMaxAge }),
  });

  const {
    refreshToken: _refreshToken,
    refreshTokenExpiresAtMs: _refreshTokenExpiresAtMs,
    isAuto: _isAuto,
    accessToken: _accessToken,
    ...clientData
  } = result;

  return clientData;
};
