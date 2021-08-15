/**
 * _document는 SEO를 잘 할수 있도록 html의 document구조를 그대로 가져와서 만들어놓은 것
 */

// https://velog.io/@rhftnqls/next.js-%EC%97%90-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%81%BC%EC%96%B9%EA%B8%B0
/**
 * _document.ts는 서버 측에서만 처리되는 파일이다.
 * 여기서 우리가 하는일은 material-ui에서 생성된 필요한
 * css스타일을 모아서 문서에 문자열로 삽입하는것이다.
 *
 * 이렇게하면 클라이언트가 페이지를 수신할때 깜박임을 방지할 수 있다.
 * 위 단계를 건너뛰면 클라이언트는 처음에서버에
 * 렌더링된 페이지를 표시한 다음 자체 스타일을 삽입하여 깜빡임을 유발할수 있다.
 * _app.tsx에 useEffect를넣어준다.
 */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
// import theme from './theme/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          <meta name="theme-color" />
          <meta charSet="utf-8" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
