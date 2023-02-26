/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */
import type { BlogPostsTags } from './blogPostsTags';
import type { BlogPostsComment } from './blogPostsComment';
import type { Users } from './users';
import type { BlogPostsLike } from './blogPostsLike';

export type BlogPosts = {
  id: number;
  title: string;
  Tags: BlogPostsTags;
  Comments: BlogPostsComment[];
  content: string;
  thumbnail: string;
  UserId: number;
  User: Users;
  LikeDisLike: BlogPostsLike;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
