import { Button } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
// import { getMyUserDataApi } from '../utils/rqApis';
import { getMyUserDataApi } from '../utils/queryAPI';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getMyUserDataApi.key, () =>
    getMyUserDataApi.apiCall(req.cookies?.Authentication)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Sup = () => {
  const { data, isLoading, isError, error } = useQuery(
    getMyUserDataApi.key,
    getMyUserDataApi.apiCall
  );

  console.log(data);

  // console.log('query : ', query);
  // console.log('token : ', token);
  // cookie.set('Authentication', query, {});

  // const test = async () => {
  //   const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  //   const data = await axios
  //     .post(
  //       `${ApiUrl}/auth/login`,
  //       {
  //         email: 'test4@gmail.com',
  //         password: 'test4',
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  // if (isLoading) {
  //   return <div>로딩중 입니다.</div>;
  // }
  // if (isError) {
  //   return <div>에러 메시지 : {error}</div>;
  // }

  // if (!data) {
  //   return <div>데이터가 없습니다.</div>;
  // }

  return (
    <>
      <Head>
        <title>{data && data.email}</title>
      </Head>
      <Button color="primary" variant="contained">
        {data && data.loginID}
      </Button>
    </>
  );
};

export default Sup;
