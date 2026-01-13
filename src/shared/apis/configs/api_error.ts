import type { ValidationErrorDto } from '@/shared/apis/schemas';

export default class ApiError extends Error {
  public readonly code: string;
  public readonly errors?: ValidationErrorDto[];

  constructor(code: string, message: string, errors?: ValidationErrorDto[]) {
    super(message);
    this.code = code;
    this.errors = errors;
    this.name = 'ApiError';
  }
}
