/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * Blog nestjs API
 * Blog 개발을 위한 nestjs api 문서입니다
 * OpenAPI spec version: 1.0
 */

/**
 * user의 권한
 */
export type UserDtoRole = typeof UserDtoRole[keyof typeof UserDtoRole];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserDtoRole = {
  user: 'user',
  admin: 'admin',
} as const;
