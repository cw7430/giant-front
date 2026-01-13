import { z } from 'zod';

export const signInRequestSchema = z.object({
  userName: z.string().min(1, '아이디를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  isAuto: z.boolean(),
});

export const signInResponseSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.string(),
  employeeCode: z.string(),
  employeeName: z.string(),
  accountRole: z.string(),
  employeeRole: z.string(),
  department: z.string(),
  team: z.string(),
  position: z.string(),
});

export type SignInRequestDto = z.infer<typeof signInRequestSchema>;
export type SignInResponseDto = z.infer<typeof signInResponseSchema>;
