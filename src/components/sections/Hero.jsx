import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-nodeslix-primary py-20 sm:py-28 lg:py-32">
      <div className="app-container">
        {/* Hero section: left-side placeholder messaging with right-side illustration frame. */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="max-w-3xl space-y-9">
            <div className="space-y-6">
              <p className="section-kicker">Placeholder</p>
              <h1 className="text-5xl font-semibold leading-[1.05] text-nodeslix-text sm:text-6xl lg:text-7xl">
                Title placeholder
              </h1>
              <p className="max-w-xl text-base leading-7 text-nodeslix-muted sm:text-lg">
                Subtitle placeholder text for the NodeSlix home page layout approval review.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="primary-button"
              >
                View Dashboard
              </Link>
              <a
                href="#architecture"
                className="secondary-button"
              >
                See Architecture
              </a>
            </div>
          </div>

          <div className="panel-shell min-h-[340px] border-dashed sm:min-h-[460px]">
            <div className="flex h-full min-h-[292px] items-center justify-center rounded-xl border border-nodeslix-border bg-nodeslix-secondary text-center text-sm text-nodeslix-muted sm:min-h-[396px]">
              Large illustration placeholder box
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
