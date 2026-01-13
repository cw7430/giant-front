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
    result: resultSchema.optional(),
  });

export const apiFailSchema = apiBaseSchema.extend({
  errors: z.array(validationErrorSchema).optional(),
});

export type ApiSuccessDto<T> = z.infer<typeof apiBaseSchema> & {
  result?: T;
};

export type ApiFailDto = z.infer<typeof apiFailSchema>;

export type ValidationErrorDto = z.infer<typeof validationErrorSchema>;
