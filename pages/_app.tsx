import '../styles/styles.scss';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { QueryClientProvider, QueryClient } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme/theme';

// const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // props로 넘어온 Component는 현재 페이지를 의미한다.
  // 페이지 전환시에 이 컴포넌트 프롭스가 변경된다.
  // pageProps는 dataFetching 메서드를 통해 미리 가져온 초기 객체임.
  // 이 메서드를 사용하지 않는다면 빈객체가 전달됨.

  useEffect(() => {
    /**
     * material-ui 를 위한 설정
     */
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Blog - LKHcoding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      {/* <QueryClientProvider client={queryClient}> */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>

      {/* {process.env.NODE_ENV === 'production' ? null : <ReactQueryDevtools />} */}
      {/* </QueryClientProvider> */}
    </>
  );
}
/**
 * 페이지 전환시 레이아웃을 유지할 수 있습니다.
 * 페이지 전환시 상태값을 유지할 수 있습니다.
 * componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있습니다.
 * 추가적인 데이터를 페이지로 주입시켜주는게 가능합니다.
 * 글로벌 css를 이곳에 선언합니다.
 */
export default MyApp;

// 서버사이드에서 데이터 가져오는 구조로 세팅하는 부분
// MyApp.getInitialProps = async ({ ctx, Component }: { ctx: any; Component: any }) => {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     // 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   return { pageProps };
// };

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
