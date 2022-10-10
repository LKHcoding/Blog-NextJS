/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * Blog nestjs API
 * Blog 개발을 위한 nestjs api 문서입니다
 * OpenAPI spec version: 1.0
 */
import type { BlogPostsUser } from './blogPostsUser';
import type { BlogPostsLike } from './blogPostsLike';

export type BlogPosts = {
  id: number;
  title: string;
  Tags: string[];
  content: string;
  thumbnail: string;
  UserId: number;
  User: BlogPostsUser;
  LikeDisLike: BlogPostsLike;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
