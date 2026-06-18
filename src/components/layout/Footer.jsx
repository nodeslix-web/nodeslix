const Footer = () => {
  return (
    <footer className="border-t border-nodeslix-border/80 bg-nodeslix-secondary">
      <div className="app-container flex flex-col gap-4 py-8 text-sm text-nodeslix-muted sm:flex-row sm:items-center sm:justify-between">
        {/* Footer shell reserved for approval-stage navigation or legal links. */}
        <p className="font-semibold text-nodeslix-text">NodeSlix</p>
        <p>Telecom Network Operations Center wireframe</p>
      </div>
    </footer>
  );
};

export default Footer;
