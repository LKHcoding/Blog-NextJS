import { loginType } from './LoginType';
import { UserRole } from './UserRoleType';

export interface IUser {
  id: number;

  githubID: string | null;

  email: string | null;

  nickname: string | null;

  loginID: string;

  blog: string | null;

  bio: string | null;

  avatarUrl: string | null;

  githubPageUrl: string | null;

  loginType: loginType;

  role: UserRole;

  createdAt: string;

  updatedAt: string;

  deletedAt: string;
}
