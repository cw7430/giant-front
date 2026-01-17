import { cookies } from 'next/headers';

import { ApiSuccessDtoWithResult } from '@/shared/apis/schemas';
import { SignInResponseDtoForServer } from '@/features/auth/sign-in/schema';

export const signInAndRefreshActions = async (
  response: ApiSuccessDtoWithResult<SignInResponseDtoForServer>,
) => {
  const result = response.result;
  const cookieStore = await cookies();

  const refreshMaxAge = result.isAuto
    ? Math.max(
        0,
        Math.floor((result.refreshTokenExpiresAt - Date.now()) / 1000),
      )
    : undefined;

  const isSecure = process.env.APP_ENV !== 'local';

  cookieStore.set({
    name: 'accessToken',
    value: result.accessToken,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: isSecure,
  });

  cookieStore.set({
    name: 'refreshToken',
    value: result.refreshToken,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: isSecure,
    ...(refreshMaxAge !== undefined && { maxAge: refreshMaxAge }),
  });

  const {
    refreshToken: _refreshToken,
    refreshTokenExpiresAt: _refreshTokenExpiresAt,
    isAuto: _isAuto,
    accessToken: _accessToken,
    ...clientData
  } = result;

  return clientData;
};
