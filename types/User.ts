import { LoginType } from './LoginType';
import { UserRole } from './UserRole';

export type User = {
  id: number;
  githubID: string | null;
  positionType: string;
  email: string | null;
  nickname: string | null;
  loginID: string;
  blog: string | null;
  bio: string | null;
  avatarUrl: string | null;
  githubPageUrl: string | null;
  loginType: (typeof LoginType)[keyof typeof LoginType];
  role: (typeof UserRole)[keyof typeof UserRole];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
