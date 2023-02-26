/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */

/**
 * user의 권한
 */
export type UsersRole = typeof UsersRole[keyof typeof UsersRole];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UsersRole = {
  user: 'user',
  admin: 'admin',
} as const;
