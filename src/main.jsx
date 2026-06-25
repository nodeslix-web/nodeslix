import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import OverviewPage from './pages/dashboard/OverviewPage.jsx';
import InfrastructurePage from './pages/dashboard/InfrastructurePage.jsx';
import AIEnginePage from './pages/dashboard/AIEnginePage.jsx';
import OperationsPage from './pages/dashboard/OperationsPage.jsx';
import TopologyPage from './pages/dashboard/TopologyPage.jsx';
import AnalyticsPage from './pages/dashboard/AnalyticsPage.jsx';
import UsersPage from './pages/dashboard/UsersPage.jsx';
import SettingsPage from './pages/dashboard/SettingsPage.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import PaymentCancelled from './pages/PaymentCancelled.jsx';
import ChatwootWidget from './components/ChatwootWidget.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css';

/**
 * Root layout — lives inside the router so useNavigate works,
 * but wraps every page with AuthProvider.
 */
const RootWithAuth = () => (
  <AuthProvider>
    <Outlet />
    <ChatwootWidget />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    /* ── Auth boundary (wraps entire app) ── */
    element: <RootWithAuth />,
    children: [
      {
        /* ── Home site routes (Navbar + Footer) ── */
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true,             element: <Home />          },
          { path: 'product',         element: <ProductPage />   },
          { path: 'privacy-policy',  element: <PrivacyPolicy /> },
        ],
      },
      {
        /* ── Standalone login page (no Navbar / Footer) ── */
        path: '/login',
        element: <LoginPage />,
      },
      {
        /* ── Standalone register page (no Navbar / Footer) ── */
        path: '/register',
        element: <RegisterPage />,
      },
      {
        /* ── Payment feedback landing pages (no Navbar / Footer) ── */
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: '/payment-cancelled',
        element: <PaymentCancelled />,
      },
      {
        /* ── Dashboard: protected, full-screen layout ── */
        path: '/dashboard',
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true,            element: <OverviewPage />       },
              { path: 'infrastructure', element: <InfrastructurePage /> },
              { path: 'ai-engine',      element: <AIEnginePage />       },
              { path: 'operations',     element: <OperationsPage />     },
              { path: 'topology',       element: <TopologyPage />       },
              { path: 'analytics',      element: <AnalyticsPage />      },
              { path: 'users',          element: <UsersPage />          },
              { path: 'settings',       element: <SettingsPage />       },
            ],
          },
        ],
      },
      {
        /* ── Catch-all redirect ── */
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
