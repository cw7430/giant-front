import { z } from 'zod';

export const signInAndRefreshResponseSchemaForClient = z.object({
  accessTokenExpiresAtMs: z.number(),
  employeeCode: z.string(),
  employeeName: z.string(),
  accountRole: z.enum(['USER', 'ADMIN']),
  employeeRole: z.enum(['DEPARTMENT_CHIEF', 'TEAM_CHIEF', 'EMPLOYEE']),
  department: z.string(),
  team: z.string(),
  position: z.string(),
});

export const signInAndRefreshResponseSchemaForServer =
  signInAndRefreshResponseSchemaForClient.extend({
    accessToken: z.string(),
    refreshToken: z.string(),
    refreshTokenExpiresAtMs: z.number(),
    isAuto: z.boolean(),
  });

export type SignInAndRefreshResponseDtoForClient = z.infer<
  typeof signInAndRefreshResponseSchemaForClient
>;
export type SignInAndRefreshResponseDtoForServer = z.infer<
  typeof signInAndRefreshResponseSchemaForServer
>;
