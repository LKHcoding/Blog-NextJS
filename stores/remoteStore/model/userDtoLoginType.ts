/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */

/**
 * 로그인 type
 */
export type UserDtoLoginType = typeof UserDtoLoginType[keyof typeof UserDtoLoginType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserDtoLoginType = {
  local: 'local',
  github: 'github',
} as const;
