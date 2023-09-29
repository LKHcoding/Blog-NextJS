import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useStyles } from 'components/profile/[loginID].style';

const Profile: FC = () => {
  const router = useRouter();
  const classes = useStyles();

  if (!router.query.loginID) {
    return null;
  }

  return <div className={classes.root}>준비중인 페이지 입니다.</div>;
};

export default Profile;
