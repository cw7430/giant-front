import type { FailCodes } from '~~/layers/base/shared/constants/response-code';
import type { ValidationError } from '~~/layers/base/shared/schema/api';

export class ApiError extends Error {
  public readonly code: FailCodes;
  public readonly errors?: ValidationError[];

  constructor(code: FailCodes, message: string, errors?: ValidationError[]) {
    super(message);
    this.code = code;
    this.errors = errors;
    this.name = 'ApiError';
  }
}
