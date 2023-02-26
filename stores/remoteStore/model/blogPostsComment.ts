/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */
import type { Users } from './users';

export type BlogPostsComment = {
  id: number;
  ParentCommentId: number;
  PostId: number;
  content: string;
  UserId: number;
  User: Users;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
