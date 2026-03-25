import type { H3Event } from 'h3';

import type {
  ClientResponseDtoSingle,
  ClientResponseDtoWithResult,
  ValidationError,
} from '~~/layers/base/shared/schema/api';
import type { FailCodes } from '~~/layers/base/shared/constants/response-code';
import { ApiError } from '~~/layers/base/shared/configs/api-error';

const successSingle = (): ClientResponseDtoSingle => ({
  code: 'SU',
  message: '요청이 성공적으로 처리되었습니다.',
});

const successWithResult = <T>(result: T): ClientResponseDtoWithResult<T> => ({
  code: 'SU',
  message: '요청이 성공적으로 처리되었습니다.',
  result,
});

const fail = (
  code: FailCodes,
  message: string,
  errors?: ValidationError[],
): ClientResponseDtoWithResult<never> => ({
  code,
  message,
  errors,
});

const single = (fn: () => Promise<void>): Promise<ClientResponseDtoSingle> =>
  (async () => {
    try {
      await fn();
      return successSingle();
    } catch (e) {
      if (e instanceof ApiError) {
        return fail(e.code, e.message, e.errors);
      }
      throw e;
    }
  })();

const withResult = <T>(
  fn: () => Promise<T>,
): Promise<ClientResponseDtoWithResult<T>> =>
  (async () => {
    try {
      const result = await fn();
      return successWithResult(result);
    } catch (e) {
      if (e instanceof ApiError) {
        return fail(e.code, e.message, e.errors);
      }
      throw e;
    }
  })();

export const clientResponseSingle = (
  handler: (event: H3Event) => Promise<void>,
) => defineEventHandler((event) => single(() => handler(event)));

export const clientResponseWithResult = <T>(
  handler: (event: H3Event) => Promise<T>,
) => defineEventHandler((event) => withResult(() => handler(event)));
