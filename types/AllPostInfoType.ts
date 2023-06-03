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
    }
  ];
  LikeDisLike: [
    {
      actionType: ActionType;
      UserId: number;
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
