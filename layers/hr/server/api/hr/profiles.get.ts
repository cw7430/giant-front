import type { ApiSuccessDtoWithResult } from '~~/layers/base/shared/schema/api';
import {
  employeeProfilesResponseSchema,
  type EmployeeProfilesResponseDto,
} from '~~/layers/hr/contract/schema/profile';
import { clientResponseWithResult } from '~~/layers/base/server/utils/client-response';
import { ApiError } from '~~/layers/base/shared/configs/api-error';

export default clientResponseWithResult(async (event) => {
  const param = getQuery(event);
  const response: ApiSuccessDtoWithResult<EmployeeProfilesResponseDto> =
    await apiGet(event, '/hr/profiles', param, { authType: 'access' });

  if (!response?.result) {
    throw new ApiError('ISE', '서버에서 응답이 없습니다.');
  }

  const validateData = employeeProfilesResponseSchema.safeParse(
    response.result,
  );

  if (!validateData.success) {
    throw new ApiError('ISE', '서버 응답 형식이 올바르지 않습니다.');
  }

  return validateData;
});
