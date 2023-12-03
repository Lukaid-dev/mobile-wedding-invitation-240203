import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

import { router } from './router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
