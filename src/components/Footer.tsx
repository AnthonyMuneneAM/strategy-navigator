const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-gradient-brand font-display text-xl font-bold">DQ</span>
            <span className="font-body text-sm font-semibold text-foreground">TMaaS</span>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            © 2026 DQ TMaaS. Transformation Management as a Service.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
