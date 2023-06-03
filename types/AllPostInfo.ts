export type AllPostInfo = {
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
      actionType: (typeof ActionType)[keyof typeof ActionType];
      UserId: number;
    }
  ];
  User: {
    loginID: string;
    avatarUrl: string;
    positionType: (typeof DeveloperPositionType)[keyof typeof DeveloperPositionType];
    deletedAt: Date | null;
  };
};

export const DeveloperPositionType = {
  FrontEnd: 'Front-End',
  BackEnd: 'Back-End',
  FullStack: 'Full-Stack',
} as const;
export const ActionType = {
  Like: 'Like',
  DisLike: 'DisLike',
} as const;
