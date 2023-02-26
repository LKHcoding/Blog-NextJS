/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */

/**
 * 로그인 type
 */
export type UsersLoginType = typeof UsersLoginType[keyof typeof UsersLoginType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UsersLoginType = {
  local: 'local',
  github: 'github',
} as const;
