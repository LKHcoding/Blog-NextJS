/* eslint-disable prefer-rest-params */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-inner-declarations */
import React, { useEffect, FC } from 'react';
import Head from 'next/head';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: any;
  }
}
const GoogleAnalyticsHOC: FC = ({ children }) => {
  // const gtag = (data: any, ...args: any[]) => {
  //   data.push(args);
  // };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function (...args: any[]) {
          window.dataLayer.push(args);
        };
        // eslint-disable-next-line
        // function gtag(...args: any[]) {
        //   window.dataLayer.push(args);
        // }
        window.gtag('js', new Date());
        window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID || '', {
          page_location: window.location.href,
          page_path: window.location.pathname,
          page_title: window.document.title,
        });
        console.log('들어오나 ', window);
      }
    }
  }, []);

  return (
    <>
      {children}
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
          }
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              page_location: window.location.href,
              page_title: window.document.title,
            });
          `,
          }}
        /> */}
      </Head>
    </>
  );
};
export default GoogleAnalyticsHOC;
