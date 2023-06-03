export type PostInfo = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Tags: [{ tagName: string }];
  LikeDisLike: [{ actionType: string; UserId: number }];
};
