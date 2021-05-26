import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // props로 넘어온 Component는 현재 페이지를 의미한다.
  // 페이지 전환시에 이 컴포넌트 프롭스가 변경된다.
  // pageProps는 dataFetching 메서드를 통해 미리 가져온 초기 객체임.
  // 이 메서드를 사용하지 않는다면 빈객체가 전달됨.

  <Head>
    <title>Blog</title>
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  </Head>;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {process.env.NODE_ENV === 'production' ? null : <ReactQueryDevtools />}
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

/**
 * 페이지 전환시 레이아웃을 유지할 수 있습니다.
 * 페이지 전환시 상태값을 유지할 수 있습니다.
 * componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있습니다.
 * 추가적인 데이터를 페이지로 주입시켜주는게 가능합니다.
 * 글로벌 css를 이곳에 선언합니다.
 */
