import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const Profile: FC = () => {
  const router = useRouter();

  if (!router.query.loginID) {
    return null;
  }
  return (
    <>
      <div
        style={{
          width: '100%',
          minHeight: '500px',
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
        }}>
        준비중인 페이지 입니다.
      </div>
      {/* <Button color="primary" variant="contained">
        {router.query.loginID && `유저 : ${router.query.loginID}`}
      </Button> */}
    </>
  );
};

export default Profile;
