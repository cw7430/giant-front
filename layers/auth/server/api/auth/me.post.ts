import { clientResponseSingle } from '~~/layers/base/server/utils/client-response';
import { ApiError } from '~~/layers/base/shared/configs/api-error';

export default clientResponseSingle(async (event) => {
  const accessToken = getCookie(event, 'accessToken');
  if (!accessToken) throw new ApiError('UA', '인증 상태가 올바르지 않습니다.');
});
