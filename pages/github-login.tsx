import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export async function getServerSideProps() {
  return { props: {} };
}

const githubLogin = () => {
  const router = useRouter();
  // const { code } = router.query;

  // console.log(code);

  const gitApi = async (code: string | string[] | undefined) => {
    const data = {
      code,
    };
    // console.log('data : ', data);

    const result = await axios
      .post('http://localhost:3030/auth/github-info', data, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err.message));
    console.log(result);
  };

  useEffect(() => {
    const { code } = router.query;
    gitApi(code);
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '81vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    </>
  );
};

export default githubLogin;
