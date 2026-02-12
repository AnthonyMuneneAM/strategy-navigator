import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Marketplace from "./pages/Marketplace";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import ChatButton from "./components/ChatButton";
import Overview from "./pages/dashboard/Overview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
