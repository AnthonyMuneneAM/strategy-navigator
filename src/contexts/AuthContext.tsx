import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'client' | 'dq_delivery_lead';

interface User {
  name: string;
  email: string;
  roleTitle: string;
  organization: string;
  avatar: string;
  role: UserRole;
}

const mockClientUserSTCBank: User = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@stcbank.com",
  roleTitle: "Chief Digital Officer",
  organization: "STC Bank",
  avatar: "SM",
  role: 'client',
};

const mockClientUserDEWA: User = {
  name: "Ahmed Al Tayer",
  email: "ahmed.altayer@dewa.gov.ae",
  roleTitle: "Chief Digital & Innovation Officer",
  organization: "Dubai Electricity & Water Authority",
  avatar: "AA",
  role: 'client',
};

const mockDQDeliveryLead: User = {
  name: "Rayyan Basha",
  email: "rayyan.basha@dataquest.com",
  roleTitle: "DQ Delivery Lead",
  organization: "DataQuest",
  avatar: "RB",
  role: 'dq_delivery_lead',
};

interface AuthContextType {
  user: User;
  setUserRole: (role: UserRole) => void;
  setUserOrganization: (organization: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(mockClientUserDEWA);

  const setUserRole = (role: UserRole) => {
    if (role === 'client') {
      setUser(mockClientUserDEWA);
    } else if (role === 'dq_delivery_lead') {
      setUser(mockDQDeliveryLead);
    }
  };

  const setUserOrganization = (organization: string) => {
    if (organization === 'STC Bank') {
      setUser(mockClientUserSTCBank);
    } else if (organization === 'Dubai Electricity & Water Authority') {
      setUser(mockClientUserDEWA);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUserRole, setUserOrganization }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
