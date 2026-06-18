import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CookieBanner from '../common/CookieBanner.jsx';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-nodeslix-primary text-nodeslix-text">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default MainLayout;
