export interface IPostInfoType {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Tags: [{ tagName: string }];
}
