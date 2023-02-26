/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */
import type { GithubUserInfoDTO } from './githubUserInfoDTO';
import type { GithubSignUpDtoPositionType } from './githubSignUpDtoPositionType';

export type GithubSignUpDto = {
  /** github User Data Type */
  githubUserInfo: GithubUserInfoDTO;
  /** 개발자 포지션 타입 */
  positionType: GithubSignUpDtoPositionType;
};
