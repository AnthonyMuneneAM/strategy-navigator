import { useAuth } from "@/contexts/AuthContext";
import ClientEngagements from "@/components/engagements/ClientEngagements";
import DQEngagements from "@/components/engagements/DQEngagements";

const ActiveServices = () => {
  const { user } = useAuth();
  
  if (user.role === 'dq_delivery_lead') {
    return <DQEngagements />;
  }
  
  return <ClientEngagements />;
};

export default ActiveServices;
