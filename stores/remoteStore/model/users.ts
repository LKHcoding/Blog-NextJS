/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */
import type { UsersPositionType } from './usersPositionType';
import type { UsersLoginType } from './usersLoginType';
import type { UsersRole } from './usersRole';

export type Users = {
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
  positionType: UsersPositionType;
  /** 로그인 type */
  loginType: UsersLoginType;
  /** user의 권한 */
  role: UsersRole;
  /** 가입 일자 */
  createdAt: string;
  /** 수정 일자 */
  updatedAt: string;
  /** 탈퇴 일자 */
  deletedAt: string;
};
