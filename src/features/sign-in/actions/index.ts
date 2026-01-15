'use server';

import { cookies } from 'next/headers';

import { apiPost } from '@/shared/apis/configs/fetch_request';
import {
  type SignInRequestDto,
  type SignInResponseDtoForServer,
  type SignInResponseDtoForClient,
} from '@/features/sign-in/schema';

export const signInAction = async (
  data: SignInRequestDto,
): Promise<SignInResponseDtoForClient> => {
  const response = await apiPost<SignInResponseDtoForServer>(
    '/auth/sign-in',
    data,
  );

  if (!response) {
    throw new Error('Sign-in failed');
  }

  const cookieStore = await cookies();

  const refreshMaxAge = response.isAuto
    ? Math.max(
        0,
        Math.floor((response.refreshTokenExpiresAt - Date.now()) / 1000),
      )
    : undefined;

  const isSecure = process.env.APP_ENV !== 'local';

  cookieStore.set({
    name: 'accessToken',
    value: response.accessToken,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: isSecure,
  });

  cookieStore.set({
    name: 'refreshToken',
    value: response.refreshToken,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: isSecure,
    ...(refreshMaxAge !== undefined && { maxAge: refreshMaxAge }),
  });

  return {
    accessTokenExpiresAt: response.accessTokenExpiresAt,
    employeeCode: response.employeeCode,
    employeeName: response.employeeName,
    accountRole: response.accountRole,
    employeeRole: response.employeeRole,
    department: response.department,
    team: response.team,
    position: response.position,
  };
};
