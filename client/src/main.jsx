import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { VibeProvider } from './components/VibeProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VibeProvider>
      <RouterProvider router={router} />
    </VibeProvider>
  </React.StrictMode>
);
