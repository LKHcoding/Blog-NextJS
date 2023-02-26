/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */

export type CreateBlogCommentDto = {
  /** postId */
  postId: number;
  /** parentCommentId */
  parentCommentId?: number;
  /** content */
  content: string;
};
