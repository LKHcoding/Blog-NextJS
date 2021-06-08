import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const Profile: FC = () => {
  const router = useRouter();

  // console.log(router.query);
  if (!router.query.loginID) {
    return null;
  }
  return (
    <>
      <Button color="primary" variant="contained">
        {router.query.loginID && `유저 : ${router.query.loginID}`}
      </Button>
    </>
  );
};

export default Profile;
