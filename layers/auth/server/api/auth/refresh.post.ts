import type { ApiSuccessDtoWithResult } from '~~/layers/base/shared/schema/api';
import type { SignInAndRefreshResponseDtoForServer } from '~~/layers/auth/contract/schema/shared';
import { clientResponseWithResult } from '~~/layers/base/server/utils/client-response';
import { signInAndRefresh } from '~~/layers/auth/server/utils/sign-in-refresh';

export default clientResponseWithResult(async (event) => {
  const body = await readBody(event);
  const response: ApiSuccessDtoWithResult<SignInAndRefreshResponseDtoForServer> =
    await apiPost(event, '/auth/refresh', body, { authType: 'refresh' });

  return signInAndRefresh(event, response);
});
