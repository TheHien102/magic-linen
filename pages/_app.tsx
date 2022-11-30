import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StorageProvider } from '../contexts/StorageContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StorageProvider>
      <Component {...pageProps} />
    </StorageProvider>
  );
}
