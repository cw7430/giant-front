import { z } from 'zod';

export const pageRequestSchema = <T extends [string, ...string[]]>(
  sortPath: T,
) =>
  z.object({
    page: z.number(),
    size: z.number(),
    blockSize: z.number(),
    sortPath: z.enum(sortPath),
    sortOrder: z.enum(['asc', 'desc']),
  });

export type PageResponseMetaDto = {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  startPage: number;
  endPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type PageResponseDto<T> = PageResponseMetaDto & {
  contents: T;
};
