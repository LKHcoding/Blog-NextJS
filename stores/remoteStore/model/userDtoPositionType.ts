/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */

/**
 * 개발 포지션 타입
 */
export type UserDtoPositionType = typeof UserDtoPositionType[keyof typeof UserDtoPositionType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserDtoPositionType = {
  'Front-End': 'Front-End',
  'Back-End': 'Back-End',
  'Full-Stack': 'Full-Stack',
} as const;
