import { Navigate } from 'react-router-dom';

/**
 * Legacy Dashboard entry point — redirected to the new multi-page dashboard.
 * The actual dashboard is now handled by DashboardLayout + nested page routes.
 * See: src/components/layout/DashboardLayout.jsx
 *      src/pages/dashboard/
 */
const Dashboard = () => <Navigate to="/dashboard" replace />;

export default Dashboard;
