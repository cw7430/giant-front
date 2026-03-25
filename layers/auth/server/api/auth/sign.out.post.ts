import type { SignOutRequestDto } from '~~/layers/auth/contract/schema/sign-out';

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refreshToken') || '';
  const body: SignOutRequestDto = { refreshToken };

  try {
    await await apiPost(event, '/auth/sign-out', body);
  } catch (e) {
    console.error('Sign-out API call failed:', e);
  }

  deleteCookie(event, 'accessToken');
  deleteCookie(event, 'refreshToken');
});
