import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StoreProvider } from './Store';
import { HelmetProvider } from 'react-helmet-async';

const myTheme = extendTheme({
  colors: {
    primary: '#08510A',
    secondary: '#187718',
    text: '#e8e8e8',
    title: '#00581e',
    subtitle: '#00592e',
  },
  fonts: {
    body: `'Roboto', 'sans-serif'`,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={myTheme}>
      <StoreProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);
