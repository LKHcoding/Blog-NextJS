/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */

/**
 * 개발자 포지션 타입
 */
export type GithubSignUpDtoPositionType = typeof GithubSignUpDtoPositionType[keyof typeof GithubSignUpDtoPositionType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GithubSignUpDtoPositionType = {
  'Front-End': 'Front-End',
  'Back-End': 'Back-End',
  'Full-Stack': 'Full-Stack',
} as const;
