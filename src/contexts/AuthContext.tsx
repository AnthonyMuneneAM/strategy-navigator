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

const mockClientUser: User = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@stcbank.com",
  roleTitle: "Chief Digital Officer",
  organization: "STC Bank",
  avatar: "SM",
  role: 'client',
};

const mockDQDeliveryLead: User = {
  name: "Alex Johnson",
  email: "alex.johnson@dataquest.com",
  roleTitle: "DQ Delivery Lead",
  organization: "DataQuest",
  avatar: "AJ",
  role: 'dq_delivery_lead',
};

interface AuthContextType {
  user: User;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(mockClientUser);

  const setUserRole = (role: UserRole) => {
    if (role === 'client') {
      setUser(mockClientUser);
    } else if (role === 'dq_delivery_lead') {
      setUser(mockDQDeliveryLead);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUserRole }}>
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
