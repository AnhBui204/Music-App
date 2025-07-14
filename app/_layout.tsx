// app/_layout.tsx hoặc app/layout.tsx tùy theo setup của bạn
import { FavoritesProvider } from "@/components/Favorite/FavoritesContext"; // ✅ thêm dòng này
import { StatsProvider } from "@/components/Favorite/StatsContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <StatsProvider>
      <FavoritesProvider> {/* ✅ bọc ở đây */}
        <Slot />
      </FavoritesProvider>
    </StatsProvider>
  );
}
