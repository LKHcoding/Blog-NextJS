/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */
import type { LocalSignUpRequestDtoPositionType } from './localSignUpRequestDtoPositionType';

export type LocalSignUpRequestDto = {
  /** 이메일 */
  email: string;
  /** loginID */
  loginID: string;
  /** nickname */
  nickname: string;
  /** blog url */
  blog: string;
  /** 자기소개 */
  bio: string;
  /** 비밀번호(5~30자) */
  password: string;
  /** 개발 포지션 타입 */
  positionType: LocalSignUpRequestDtoPositionType;
};
