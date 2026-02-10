const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-xl font-bold text-foreground">DQ</span>
          <span className="text-sm font-semibold text-muted-foreground">TMaaS</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 DQ TMaaS · Transformation Management as a Service
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
