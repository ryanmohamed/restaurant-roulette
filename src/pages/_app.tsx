import Layout from '@/components/layout';
import { LocationProvider } from '@/context/LocationContext';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocationProvider>
  );
}
