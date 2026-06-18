import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-nodeslix-primary text-nodeslix-text">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
