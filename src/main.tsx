import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SiteConfigProvider } from './context/SiteConfigContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <SiteConfigProvider>
    <App />
  </SiteConfigProvider>
);
