// app/Favorite/PlayScreen.tsx
import PlayScreen from '@/components/Favorite/PlayScreen';
import { useLocalSearchParams } from 'expo-router';

export default function WrappedPlayScreen() {
  const params = useLocalSearchParams();

  return <PlayScreen params={params} />;
}
