import { z } from 'zod';

const apiBaseSchema = z.object({
  code: z.string(),
  message: z.string(),
});

const validationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const apiSuccessSchema = <T extends z.ZodTypeAny>(resultSchema: T) =>
  apiBaseSchema.extend({
    code: z.literal('SU'),
    message: z.literal('요청이 성공적으로 처리되었습니다.'),
    result: resultSchema.optional(),
  });

export const apiFailSchema = apiBaseSchema.extend({
  errors: z.array(validationErrorSchema).optional(),
});

export type ApiSuccessDto<T> = {
  code: 'SU';
  message: '요청이 성공적으로 처리되었습니다.';
  result?: T;
};

export type ApiFailDto = z.infer<typeof apiFailSchema>;

export type ValidationErrorDto = z.infer<typeof validationErrorSchema>;

export type ClientResponseDto<T> = ApiSuccessDto<T> | ApiFailDto;
