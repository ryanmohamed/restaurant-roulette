import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import LoadingPage from '@/components/server/LoadingPage';
import { LocationProvider } from '@/context/LocationContext';
import Modal from '@/components/client/Modal';
import GoogleMap from '@/components/client/GoogleMap';

const App = ({ Component, pageProps }: AppProps) => {

  // mainly added for ssr pages while data is being fetched
  const [ loadingRoute, setLoading ] = useState<boolean>(false);
  
    useEffect(() => {
      const start = () => setLoading(true);
      const end = () => setLoading(false);
      Router.events.on("routeChangeStart", start);
      Router.events.on("routeChangeComplete", end);
      Router.events.on("routeChangeError", end);
      return () => {
        Router.events.off("routeChangeStart", start);
        Router.events.off("routeChangeComplete", end);
        Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <LocationProvider>
      <Layout>
        { loadingRoute ? <LoadingPage /> : <Component {...pageProps} /> }
      </Layout>
    </LocationProvider>
  );
}

export default App;