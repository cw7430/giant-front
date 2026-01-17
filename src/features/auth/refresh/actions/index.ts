'use server';

import { clientResponseWithResult } from '@/shared/apis/configs';
import { apiPost } from '@/shared/apis/configs/fetch_request';
import { ApiSuccessDtoWithResult } from '@/shared/apis/schemas';
import { type RefreshRequestDto } from '@/features/auth/refresh/schema';
import { type SignInResponseDtoForServer } from '@/features/auth/sign-in/schema';
import { ApiError } from '@/shared/apis/configs';
import { signInAndRefreshActions } from '@/features/auth/shared/actions';

export const refreshAction = async (body: RefreshRequestDto) =>
  clientResponseWithResult(async () => {
    const response = await apiPost<
      ApiSuccessDtoWithResult<SignInResponseDtoForServer>
    >('/auth/refresh', body, { authType: 'refresh' });

    if (!response?.result) {
      throw new ApiError('ISE', '서버에서 응답이 없습니다.');
    }

    return signInAndRefreshActions(response);
  });
