// app/playscreen.tsx
import PlayScreen from '@/components/Favorite/PlayScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function WrappedPlayScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Create mock navigation and route objects to match the expected interface
  const mockRoute = {
    params: {
      song: typeof params.song === 'string' ? JSON.parse(params.song) : params.song
    }
  };

  const mockNavigation = {
    goBack: () => router.back(),
    navigate: (screen: string, options?: any) => {
      if (screen === 'PlayScreen') {
        // Already on PlayScreen, do nothing
        return;
      }
      router.push(screen as any);
    }
  };

  return <PlayScreen route={mockRoute} navigation={mockNavigation} />;
}
