import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import IntroOverlay from './IntroOverlay';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <IntroOverlay />
      <App />
    </>
  </StrictMode>,
);
