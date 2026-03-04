import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-brand shadow-lg">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-bold text-white">DQ</span>
            <span className="text-sm font-semibold tracking-wide text-white/90">TMaaS</span>
          </div>
          
          <a href="/explore" className="hidden text-sm text-white/80 transition-colors hover:text-white md:block">
            Explore Services
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a href="/sign-in" className="text-sm text-white/80 transition-colors hover:text-white">Sign In</a>
          <a href="/sign-in">
            <Button size="sm" className="rounded-full bg-white text-primary hover:bg-white/90 px-5 font-semibold shadow-md">
              Get Started
            </Button>
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/20 bg-gradient-brand p-6 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="/explore" className="text-sm text-white/90">Explore Services</a>
            <a href="/sign-in" className="text-sm text-white/90">Sign In</a>
            <a href="/sign-in">
              <Button size="sm" className="w-full rounded-full bg-white text-primary hover:bg-white/90 mt-2 font-semibold">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
