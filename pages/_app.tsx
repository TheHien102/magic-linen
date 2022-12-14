import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StorageProvider } from '../contexts/StorageContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#000',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StorageProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StorageProvider>
  );
}
