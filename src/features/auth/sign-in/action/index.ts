'use server';

import { cookies } from 'next/headers';

import { clientResponseWithResult } from '@/shared/apis/configs';
import { apiPost } from '@/shared/apis/configs/fetch_request';
import { ApiSuccessDtoWithResult } from '@/shared/apis/schemas';
import {
  type SignInRequestDto,
  type SignInResponseDtoForServer,
} from '@/features/auth/sign-in/schema';
import { ApiError } from '@/shared/apis/configs';

export const signInAction = (body: SignInRequestDto) =>
  clientResponseWithResult(async () => {
    const response = await apiPost<
      ApiSuccessDtoWithResult<SignInResponseDtoForServer>
    >('/auth/sign-in', body);

    if (!response?.result) {
      throw new ApiError('ISE', '서버에서 응답이 없습니다.');
    }

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
  });
