/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */
import type { UserDtoPositionType } from './userDtoPositionType';
import type { UserDtoLoginType } from './userDtoLoginType';
import type { UserDtoRole } from './userDtoRole';

export type UserDto = {
  /** Primary key ID */
  id: number;
  /** githubID */
  githubID: number;
  /** 이메일 */
  email: string;
  /** 닉네임 */
  nickname: string;
  /** loginID */
  loginID: string;
  /** blog url */
  blog: string;
  /** 자기소개 */
  bio: string;
  /** 프로필 사진 url */
  avatarUrl: string;
  /** Github url */
  githubPageUrl: string;
  /** 개발 포지션 타입 */
  positionType: UserDtoPositionType;
  /** 로그인 type */
  loginType: UserDtoLoginType;
  /** user의 권한 */
  role: UserDtoRole;
};
