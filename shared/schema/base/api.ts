import type { SuccessCode, FailCodes } from '~~/shared/constants/response-code';

type ValidationError = {
  field: string;
  message: string;
};

export type ApiSuccessDtoSingle = {
  code: SuccessCode;
  message: string;
};

export type ApiSuccessDtoWithResult<T> = ApiSuccessDtoSingle & {
  result: T;
};

export type ApiFailDto = {
  code: FailCodes;
  message: string;
  errors?: ValidationError[];
};

export type ClientResponseDtoSingle = ApiSuccessDtoSingle | ApiFailDto;

export type ClientResponseDtoWithResult<T> =
  | ApiSuccessDtoWithResult<T>
  | ApiFailDto;
