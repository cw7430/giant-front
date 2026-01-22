'use server';

import { clientResponseSingle } from '@/shared/apis/configs';
import { apiPost } from '@/shared/apis/configs/fetch_request';
import { type ApiSuccessDtoWithSingle } from '@/shared/apis/schemas';

export const healthCheckAction = async () =>
  clientResponseSingle(async () => {
    await apiPost<ApiSuccessDtoWithSingle>('/health-check');
  });
