import Hero from '../components/sections/Hero.jsx';
import ProductOverview from '../components/sections/ProductOverview.jsx';
import Features from '../components/sections/Features.jsx';
import Architecture from '../components/sections/Architecture.jsx';
import Workflow from '../components/sections/Workflow.jsx';
import DashboardPreview from '../components/sections/DashboardPreview.jsx';
import Contact from '../components/sections/Contact.jsx';
import Documentation from '../components/sections/Documentation.jsx';

const Home = () => {
  return (
    <>
      {/* Home page section stack. */}
      <Hero />
      <ProductOverview />
      <Features />
      <Architecture />
      <Workflow />
      <DashboardPreview />
      <Contact />
      <Documentation />
    </>
  );
};

export default Home;
