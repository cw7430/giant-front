import { z } from 'zod';

export const signInAndRefreshResponseSchemaForClient = z.object({
  accessTokenExpiresAt: z.number(),
  employeeCode: z.string(),
  employeeName: z.string(),
  accountRole: z.string(),
  employeeRole: z.string(),
  department: z.string(),
  team: z.string(),
  position: z.string(),
});

export const signInAndRefreshResponseSchemaForServer =
  signInAndRefreshResponseSchemaForClient.extend({
    accessToken: z.string(),
    refreshToken: z.string(),
    refreshTokenExpiresAt: z.number(),
    isAuto: z.boolean(),
  });

export type SignInAndRefreshResponseDtoForClient = z.infer<
  typeof signInAndRefreshResponseSchemaForClient
>;
export type SignInAndRefreshResponseDtoForServer = z.infer<
  typeof signInAndRefreshResponseSchemaForServer
>;
