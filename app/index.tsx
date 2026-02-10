import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import GhostlineSplashScreen from '@/components/GhostlineSplashScreen';

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading or wait for animation
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 4000); // Show splash for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady) {
      router.replace('/(tabs)/links');
    }
  }, [isReady]);

  return <GhostlineSplashScreen />;
}
