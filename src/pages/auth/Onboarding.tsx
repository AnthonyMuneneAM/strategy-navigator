import { OnboardingProvider, useOnboarding } from "@/contexts/OnboardingContext";
import SignIn from "./SignIn";
import ProfileSetup from "./ProfileSetup";
import OrgAccess from "./OrgAccess";
import OrgOnboarding from "./OrgOnboarding";
import OnboardingComplete from "./OnboardingComplete";

const OnboardingRouter = () => {
  const { step } = useOnboarding();

  switch (step) {
    case "signin":
      return <SignIn />;
    case "profile":
      return <ProfileSetup />;
    case "org-access":
      return <OrgAccess />;
    case "org-onboarding":
      return <OrgOnboarding />;
    case "complete":
      return <OnboardingComplete />;
    default:
      return <SignIn />;
  }
};

const Onboarding = () => (
  <OnboardingProvider>
    <OnboardingRouter />
  </OnboardingProvider>
);

export default Onboarding;
