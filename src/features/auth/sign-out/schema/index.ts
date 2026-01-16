import { z } from 'zod';

export const signOutRequestSchema = z.object({
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
});

export type SignOutRequestDto = z.infer<typeof signOutRequestSchema>;
