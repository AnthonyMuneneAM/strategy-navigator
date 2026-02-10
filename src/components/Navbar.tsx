import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gradient-brand font-display text-xl font-bold tracking-tight">DQ</span>
          <span className="font-body text-sm font-semibold tracking-wider text-foreground">TMaaS</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#framework" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Framework</a>
          <a href="#solutions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Solutions</a>
          <a href="#marketplace" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Marketplace</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-muted-foreground">Sign In</Button>
          <Button size="sm" className="bg-gradient-brand shadow-brand text-primary-foreground hover:opacity-90">Get Started</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#framework" className="text-sm font-medium text-muted-foreground">Framework</a>
            <a href="#solutions" className="text-sm font-medium text-muted-foreground">Solutions</a>
            <a href="#marketplace" className="text-sm font-medium text-muted-foreground">Marketplace</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground">Pricing</a>
            <Button size="sm" className="bg-gradient-brand shadow-brand text-primary-foreground mt-2">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
