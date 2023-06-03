import '@algolia/autocomplete-theme-classic';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'components/common/Header';
import MainSection from 'components/common/MainSection';
import NewSideBar from 'components/common/NewSideBar';
import '../styles/styles.scss';
import theme from '../theme/theme';
import toast from 'utils/toast';

dayjs.locale('ko');

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
      })
  );

  useEffect(() => {
    // NOTE: material-ui 를 위한 설정
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
    if (process.env.NODE_ENV !== 'production') {
      toast.error(
        '현재 개발모드입니다. 개발 중에는 서버가 닫히거나, 새로고침이 될 수 있습니다.'
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Develogger</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Header />

            <NewSideBar />

            <MainSection>
              <Component {...pageProps} />
            </MainSection>

            <ToastContainer />
          </ThemeProvider>
        </Hydrate>

        {/* NOTE: Devtools 를 키면 mobile 크기 화면에서 Warning 이 뜨지만 문제없음 */}
        {/* NOTE: development 환경에서만 실행됨 */}
        <ReactQueryDevtools />
      </QueryClientProvider>
      {process.env.NODE_ENV === 'production' ? (
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){
                dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
      ) : null}
    </>
  );
}
export default MyApp;
