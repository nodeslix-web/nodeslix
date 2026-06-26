import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ChatwootWidget from './components/ChatwootWidget.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css';

const RootComponent = () => (
  <>
    <Outlet />
    <ChatwootWidget />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootComponent />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true,                 element: <Home />               },
          { path: 'product',             element: <ProductPage />        },
          { path: 'Product',             element: <ProductPage />        },
          { path: 'privacy-policy',      element: <PrivacyPolicy />      },
          { path: 'terms-and-conditions', element: <TermsAndConditions /> },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
