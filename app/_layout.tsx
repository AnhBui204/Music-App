// app/_layout.tsx hoặc app/layout.tsx tùy theo setup của bạn
import { FavoritesProvider } from "@/components/Favorite/FavoritesContext"; // ✅ thêm dòng này
import { StatsProvider } from "@/components/Favorite/StatsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StatsProvider>
          <FavoritesProvider> {/* ✅ bọc ở đây */}
            <Slot />
          </FavoritesProvider>
        </StatsProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
