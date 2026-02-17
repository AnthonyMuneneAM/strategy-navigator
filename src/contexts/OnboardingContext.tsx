import { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface Organisation {
  name: string;
  website: string;
  industry: string;
  size: string;
  locations: string[];
  products: string;
  channels: string[];
  strategyFile?: string;
  orgStructureFile?: string;
}

interface OnboardingState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  organisation: Organisation | null;
  role: "customer_admin" | "customer_member" | null;
  orgName: string | null;
  step: "signin" | "profile" | "org-access" | "org-onboarding" | "complete";
}

interface OnboardingContextType extends OnboardingState {
  setStep: (step: OnboardingState["step"]) => void;
  signIn: (email: string) => void;
  saveProfile: (profile: UserProfile) => void;
  joinOrg: (code: string) => boolean;
  createOrg: () => void;
  saveOrganisation: (org: Organisation) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const VALID_INVITE_CODES: Record<string, { orgName: string; role: "customer_admin" | "customer_member" }> = {
  "ADMIN-2026": { orgName: "STC Bank", role: "customer_admin" },
  "MEMBER-2026": { orgName: "STC Bank", role: "customer_member" },
  "JOIN-ACME": { orgName: "Acme Corp", role: "customer_member" },
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<OnboardingState>({
    isAuthenticated: false,
    profile: null,
    organisation: null,
    role: null,
    orgName: null,
    step: "signin",
  });

  const setStep = (step: OnboardingState["step"]) =>
    setState((s) => ({ ...s, step }));

  const signIn = (email: string) =>
    setState((s) => ({
      ...s,
      isAuthenticated: true,
      profile: { ...s.profile, email } as UserProfile,
      step: "profile",
    }));

  const saveProfile = (profile: UserProfile) =>
    setState((s) => ({ ...s, profile, step: "org-access" }));

  const joinOrg = (code: string): boolean => {
    const match = VALID_INVITE_CODES[code.toUpperCase()];
    if (!match) return false;
    setState((s) => ({
      ...s,
      orgName: match.orgName,
      role: match.role,
      step: "complete",
    }));
    return true;
  };

  const createOrg = () =>
    setState((s) => ({ ...s, role: "customer_admin", step: "org-onboarding" }));

  const saveOrganisation = (org: Organisation) =>
    setState((s) => ({
      ...s,
      organisation: org,
      orgName: org.name,
      step: "complete",
    }));

  const reset = () =>
    setState({
      isAuthenticated: false,
      profile: null,
      organisation: null,
      role: null,
      orgName: null,
      step: "signin",
    });

  return (
    <OnboardingContext.Provider
      value={{ ...state, setStep, signIn, saveProfile, joinOrg, createOrg, saveOrganisation, reset }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be within OnboardingProvider");
  return ctx;
};
