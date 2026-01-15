import { ClientResponseDto, ValidationErrorDto } from '@/shared/apis/schemas';
import ApiError from './api_error';

const success = <T>(result: T | undefined): ClientResponseDto<T> => ({
  code: 'SU',
  message: '요청이 성공적으로 처리되었습니다.',
  result,
});

const fail = (
  code: string,
  message: string,
  errors?: ValidationErrorDto[],
): ClientResponseDto<never> => ({
  code,
  message,
  errors,
});

const clientResponse = <T>(
  fn: () => Promise<T>,
): Promise<ClientResponseDto<T>> =>
  (async () => {
    try {
      const result = await fn();
      return success(result);
    } catch (e) {
      if (e instanceof ApiError) {
        return fail(e.code, e.message, e.errors);
      }
      throw e;
    }
  })();

export default clientResponse;
