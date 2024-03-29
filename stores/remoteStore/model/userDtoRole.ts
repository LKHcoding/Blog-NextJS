/**
 * Do not edit manually.
 * Blog nestjs API
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
