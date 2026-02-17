import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-bold text-foreground">DQ</span>
            <span className="text-sm font-semibold tracking-wide text-muted-foreground">TMaaS</span>
          </div>
          
          <a href="/explore" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block">
            Explore
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a href="/signin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Login</a>
          <a href="/signin">
            <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-5">
              Get Started
            </Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background p-6 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="/explore" className="text-sm text-muted-foreground">Explore</a>
            <a href="/signin">
              <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground mt-2">Get Started</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
