import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
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
import NotFound from './pages/NotFound.jsx';
import { AppSettingsProvider } from './context/AppSettingsContext.jsx';
import './index.css';

const RootWithAuth = () => (
  <AppSettingsProvider>
    <AuthProvider>
      <ScrollToTop />
      <Outlet />
      <ChatwootWidget />
    </AuthProvider>
  </AppSettingsProvider>
);

const router = createBrowserRouter([
  {
    element: <RootWithAuth />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: '/payment-cancelled',
        element: <PaymentCancelled />,
      },
      {
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
