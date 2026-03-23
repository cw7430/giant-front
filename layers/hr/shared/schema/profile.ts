import { z } from 'zod';

import { zStringToDate } from '~~/layers/base/shared/utils/zod-helper';
import {
  pageRequestSchema,
  pageResponseSchema,
} from '~~/layers/base/shared/schema/page';

export const employeeProfilesRequestSchema = pageRequestSchema([
  'employee',
  'position',
  'department',
] as const);

export const employeeProfileResponseSchema = z.object({
  employeeId: z.string(),
  employeeCode: z.string(),
  employeeRole: z.enum(['DEPARTMENT_CHIEF', 'TEAM_CHIEF', 'EMPLOYEE', 'LEFT']),
  employeeName: z.string(),
  positionCode: z.string(),
  positionName: z.string(),
  departmentCode: z.string(),
  departmentName: z.string(),
  teamCode: z.string(),
  teamName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  createdBy: z.string().nullable(),
  createdEmployeeName: z.string().nullable(),
  updatedBy: z.string().nullable(),
  updatedEmployeeName: z.string().nullable(),
  createdAt: zStringToDate,
  updatedAt: zStringToDate,
  leftAt: z.date().nullable(),
});

export const employeeProfilesResponseSchema = pageResponseSchema(
  employeeProfileResponseSchema,
);

export type EmployeeProfilesRequestDto = z.infer<
  typeof employeeProfilesRequestSchema
>;

export type EmployeeProfileResponseDto = z.infer<
  typeof employeeProfileResponseSchema
>;

export type EmployeeProfilesResponseDto = z.infer<
  typeof employeeProfilesResponseSchema
>;
