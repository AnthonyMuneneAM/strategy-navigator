import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Marketplace from "./pages/Marketplace";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import ButlerDemo from "./pages/ButlerDemo";
import ChatButton from "./components/ChatButton";
import Overview from "./pages/dashboard/Overview";
import ActiveServices from "./pages/dashboard/ActiveServices";
import OrganisationProfile from "./pages/dashboard/OrganisationProfile";
import EngagementDetail from "./pages/dashboard/EngagementDetail";
import ServiceOrders from "./pages/dashboard/ServiceOrders";
import ServiceOrderDetail from "./pages/dashboard/ServiceOrderDetail";
import CustomerServiceOrders from "./pages/dashboard/customer/ServiceOrders";
import CustomerServiceOrderDetail from "./pages/dashboard/customer/ServiceOrderDetail";
import SignIn from "./pages/auth/SignIn";
import ProfileSetup from "./pages/onboarding/ProfileSetup";
import OrganisationAccess from "./pages/onboarding/OrganisationAccess";
import OrganisationSetup from "./pages/onboarding/OrganisationSetup";
import Complete from "./pages/onboarding/Complete";
import Legal from "./pages/legal/Legal";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import FAQ from "./pages/legal/FAQ";

import { AuthProvider } from "@/contexts/AuthContext";
import { ConversationProvider } from "@/contexts/ConversationContext";

const queryClient = new QueryClient();

// Wrapper component to conditionally render ChatButton
const ConditionalChatButton = () => {
  const location = useLocation();
  
  // Only show ChatButton on pre-login pages (not on dashboard or onboarding)
  const showChatButton = !location.pathname.startsWith('/dashboard') && 
                         !location.pathname.startsWith('/onboarding');
  
  return showChatButton ? <ChatButton /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ConversationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/butler-demo" element={<ButlerDemo />} />
          
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
          <Route path="/dashboard/engagement/:id" element={<EngagementDetail />} />
          <Route path="/dashboard/orders" element={<ServiceOrders />} />
          <Route path="/dashboard/orders/:id" element={<ServiceOrderDetail />} />
          <Route path="/dashboard/profile" element={<OrganisationProfile />} />
          
          {/* Customer Dashboard Routes */}
          <Route path="/dashboard/customer/orders" element={<CustomerServiceOrders />} />
          <Route path="/dashboard/customer/orders/:id" element={<CustomerServiceOrderDetail />} />
          
          {/* Legal Routes */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/faq" element={<FAQ />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ConditionalChatButton />
      </BrowserRouter>
      </TooltipProvider>
      </ConversationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
