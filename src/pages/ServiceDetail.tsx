import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/service-detail/ServiceHero";
import ServiceKPIs from "@/components/service-detail/ServiceKPIs";
import ServiceCapabilities from "@/components/service-detail/ServiceCapabilities";
import ServiceDeliverables from "@/components/service-detail/ServiceDeliverables";
import ServiceMethodology from "@/components/service-detail/ServiceMethodology";
import ServiceCTA from "@/components/service-detail/ServiceCTA";

const ServiceDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ServiceHero />
      <ServiceKPIs />
      <ServiceCapabilities />
      <ServiceDeliverables />
      <ServiceMethodology />
      <ServiceCTA />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
