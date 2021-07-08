import '../styles/styles.scss';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme/theme';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';

import NewSideBar from '../components/common/NewSideBar';
import Footer from '../components/common/Footer';
import MainSection from '../components/common/MainSection';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

// const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // props로 넘어온 Component는 현재 페이지를 의미한다.
  // 페이지 전환시에 이 컴포넌트 프롭스가 변경된다.
  // pageProps는 dataFetching 메서드를 통해 미리 가져온 초기 객체임.
  // 이 메서드를 사용하지 않는다면 빈객체가 전달됨.

  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          retryDelay: 1000,
        },
      },
    });
  }

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
        <title>Develogger</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header />
            <NewSideBar />
            <MainSection>
              <Component {...pageProps} />
            </MainSection>
          </ThemeProvider>
        </Hydrate>

        {/* Devtools를 키면 mobile 정도 크기 화면에서 Warning이 뜨지만 문제없음 */}
        {process.env.NODE_ENV === 'production' ? null : <ReactQueryDevtools />}
      </QueryClientProvider>
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
