import { Redirect } from 'expo-router';
import { useProfileStore } from '../src/stores/profile';

export default function Index() {
  const onboardingComplete = useProfileStore((s) => s.onboardingComplete);
  if (!onboardingComplete) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tabs)" />;
}

