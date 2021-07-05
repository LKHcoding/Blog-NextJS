export interface IAllPostInfoType {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Tags: [
    {
      tagName: string;
      // deletedAt: Date | null,
    }
  ];
  LikeDisLike: [
    {
      actionType: ActionType;
      UserId: number;
      // PostId: number,
      // createdAt: Date,
    }
  ];
  User: {
    loginID: string;
    avatarUrl: string;
    positionType: DeveloperPositionType;
    deletedAt: Date | null;
  };
}

export enum DeveloperPositionType {
  FrontEnd = 'Front-End',
  BackEnd = 'Back-End',
  FullStack = 'Full-Stack',
}
export enum ActionType {
  Like = 'Like',
  DisLike = 'DisLike',
}
