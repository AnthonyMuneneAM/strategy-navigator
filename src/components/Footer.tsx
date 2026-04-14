const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div>
            <a href="/" className="flex items-center gap-1.5 mb-4">
              <span className="text-xl font-bold text-brand">DQ</span>
              <span className="text-sm font-semibold text-muted-foreground">TMaaS</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transformation Management as a Service
            </p>
          </div>

          {/* Explore DigitalQatalyst */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Explore DigitalQatalyst</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://digitalqatalyst.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Visit DigitalQatalyst.com
                </a>
              </li>
              <li>
                <a href="https://digitalqatalyst.com/products" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="https://digitalqatalyst.com/terms" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="https://digitalqatalyst.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Explore TMaaS */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Explore TMaaS</h3>
            <ul className="space-y-2">
              <li>
                <a href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About TMaaS
                </a>
              </li>
              <li>
                <a href="/#hero" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Start with AI
                </a>
              </li>
              <li>
                <a href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Design & Deploy Services
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 DigitalQatalyst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
