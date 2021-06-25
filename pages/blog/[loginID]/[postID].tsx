import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

const Post = () => {
  const router = useRouter();
  console.log(router.query);
  return <div>여기는 상세페이지</div>;
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, params } = context;
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(getOneUserDataApi.key, () =>
  //   getOneUserDataApi.apiCall(
  //     params && 'loginID' in params && typeof params.loginID === 'string' ? params.loginID : '',
  //     req.cookies?.Authentication
  //   )
  // );

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      // params: params,
    },
  };
};
