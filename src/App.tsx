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
import ActiveServices from "./pages/dashboard/ActiveServices";
import SignIn from "./pages/auth/SignIn";
import ProfileSetup from "./pages/onboarding/ProfileSetup";
import OrganisationAccess from "./pages/onboarding/OrganisationAccess";
import OrganisationSetup from "./pages/onboarding/OrganisationSetup";
import Complete from "./pages/onboarding/Complete";

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
          
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignIn />} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding/profile" element={<ProfileSetup />} />
          <Route path="/onboarding/organisation-access" element={<OrganisationAccess />} />
          <Route path="/onboarding/organisation-setup" element={<OrganisationSetup />} />
          <Route path="/onboarding/complete" element={<Complete />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/services" element={<ActiveServices />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
