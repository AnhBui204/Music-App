// app/_layout.tsx hoặc app/layout.tsx tùy theo setup của bạn
import { FavoritesProvider } from "@/components/Favorite/FavoritesContext"; // ✅ thêm dòng này
import MiniPlayer from "@/components/Favorite/MiniPlayer";
import { MusicPlayerProvider } from "@/components/Favorite/MusicPlayerContext";
import { StatsProvider } from "@/components/Favorite/StatsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import { View } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StatsProvider>
          <FavoritesProvider>
            <MusicPlayerProvider>
              <View style={{ flex: 1 }}>
                <Slot />
                <MiniPlayer />
              </View>
            </MusicPlayerProvider>
          </FavoritesProvider>
        </StatsProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
