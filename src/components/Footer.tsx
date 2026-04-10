import { Link } from "react-router-dom";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient-brand">TMaaS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transformation Management as a Service
            </p>
          </div>

          {/* Column 2: Explore DigitalQatalyst */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Explore DigitalQatalyst</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://digitalqatalyst.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Visit DigitalQatalyst.com
                </a>
              </li>
              <li>
                <a
                  href="https://digitalqatalyst.com/products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Products
                </a>
              </li>
              <li>
                <Link
                  to="/legal/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore TMaaS */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Explore TMaaS</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/legal"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About TMaaS
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Start with AI
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Design & Deploy Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://linkedin.com/company/digitalqatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/digitalqatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@digitalqatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Youtube size={16} />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            © 2026 DigitalQatalyst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
