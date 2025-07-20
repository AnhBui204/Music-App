// app/_layout.tsx
import { Slot } from 'expo-router';
import { MusicProvider } from '../components/Favorite/MusicContext';
import { StatsProvider } from '../components/Favorite/StatsContext';

export default function RootLayout() {
  return (
    <MusicProvider>
      <StatsProvider>
        <Slot />
      </StatsProvider>
    </MusicProvider>
  );
}
