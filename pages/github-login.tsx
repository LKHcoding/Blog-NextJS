import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getMyUserDataApi } from '../utils/queryAPI';
import { useQuery } from 'react-query';

// export async function getServerSideProps() {
//   return { props: {} };
// }

const githubLogin = () => {
  const router = useRouter();
  const { code } = router.query;

  const { refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

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
    if (result?.token) {
      const gitLogin = await axios
        .post(
          '/api/gitLogin',
          { token: result.token },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .catch((err) => console.log(err.message));
      refetch();
      console.log('깃허브 로그인 성공');
      router.push('/');
    } else {
      console.log('토큰이 없습니다.');
      router.push('/login');
    }
  };

  useEffect(() => {
    // const { code } = router.query;

    if (code) {
      console.log(code);
      gitApi(code);
    }
  }, [code]);

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
