import type { ApiSuccessDtoWithResult } from '~~/layers/base/shared/schema/api';
import type { SignInAndRefreshResponseDtoForServer } from '~~/layers/auth/contract/schema/shared';
import { clientResponseWithResult } from '~~/layers/base/server/utils/client-response';

export default clientResponseWithResult(async (event) => {
  const body = await readBody(event);
  const response: ApiSuccessDtoWithResult<SignInAndRefreshResponseDtoForServer> =
    await apiPost(event, '/auth/sign-in', body);
  const result = response.result;

  const {
    refreshToken: _refreshToken,
    refreshTokenExpiresAtMs: _refreshTokenExpiresAtMs,
    isAuto: _isAuto,
    accessToken: _accessToken,
    ...clientData
  } = result;

  return clientData;
});
