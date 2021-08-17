import 'styles/app.css';
import App from 'next/app';
import Head from 'next/head';
import React, { createContext } from 'react';
import { fetchAPI } from 'lib/api';
import Layout from 'components/layout';
import NextNprogress from 'nextjs-progressbar';
import Router from 'next/router';
import smoothscroll from 'smoothscroll-polyfill';
import * as ga from '../lib/ga';

export const GlobalContext = createContext({});
function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    smoothscroll.polyfill();
  }
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    const resetScroll = () => {
      document.body.classList.remove('disable_scroll');
      if (document.querySelector('.articles'))
        document.querySelector('.articles').classList.remove('addBlur');
      if (document.querySelector('.menu-dropdown')) {
        document.querySelector('.menu-dropdown').classList.remove('active');
        document.querySelector('.mobileContent').classList.remove('active');
        document.querySelector('.searchMenu').classList.remove('active');
        document.querySelector('.dropbtn').classList.remove('hide');
        document.querySelector('.searchIcon').classList.remove('hide');
      }
    };

    Router.events.on('routeChangeStart', resetScroll);
    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', resetScroll);
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  });
  const { global } = pageProps;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link rel="alternate icon" href="/assets/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicon/favicon.svg"
        />
        <link
          rel="mask-icon"
          href="/assets/favicon/safari-pinned-tab.svg"
          color="#ff8a01"
        />
      </Head>

      <Layout>
        <NextNprogress
          color="#4b4697"
          startPosition={0.3}
          stopDelayMs={100}
          height={3}
          options={{ easing: 'ease', speed: 300, showSpinner: false }}
        />
        <GlobalContext.Provider value={global}>
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const global = await fetchAPI('/global');
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
