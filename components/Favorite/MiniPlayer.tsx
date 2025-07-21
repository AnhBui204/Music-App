// components/Favorite/MiniPlayer.tsx
import images from "@/constants/Images";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMusicPlayer } from "./MusicPlayerContext";

const MiniPlayer: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    previousTrack, // Thêm previousTrack
    isFavorite, 
    toggleFavorite 
  } = useMusicPlayer();
  const router = useRouter();
  const pathname = usePathname();

  // Ẩn MiniPlayer nếu đang ở PlayScreen
  if (!currentSong || pathname === '/playscreen') return null;

  const handlePress = () => {
    router.push({
      pathname: '/playscreen',
      params: { song: JSON.stringify(currentSong) },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.songInfo} onPress={handlePress}>
        <Image 
          source={currentSong.image ? images[currentSong.image] : images.cover} 
          style={styles.cover} 
        />
        <View style={styles.textInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {currentSong.title || 'Unknown Title'}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentSong.artist || 'Unknown Artist'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity onPress={previousTrack} style={styles.skipBtn}>
          <Ionicons name="play-skip-back" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay} style={[styles.controlBtn, styles.playBtn]}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack} style={styles.skipBtn}>
          <Ionicons name="play-skip-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(42, 42, 42, 0.75)", // Tăng lên 75% - rõ ràng hơn
    paddingHorizontal: 12, // Giảm từ 20 xuống 12 để content nhích qua trái
    paddingVertical: 12,
    borderTopWidth: 0,
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    position: "absolute",
    bottom: 45, // Giảm từ 55 xuống 45 để sát tab bar thêm 1 chút nữa
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    height: 68,
    // Glass morphism effect
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)", // Tăng viền lên
    backdropFilter: "blur(20px)", // Web only
  },
  songInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 8, // Giảm từ 14 xuống 8 để text nhích qua trái
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInfo: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  artist: {
    color: "#b8b8b8",
    fontSize: 13,
    marginTop: 3,
    fontWeight: "400",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  controlBtn: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.12)", // Tăng lên 12% - rõ ràng hơn
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)", // Tăng viền
  },
  skipBtn: {
    padding: 10, // Chỉ có padding, không có background và border
  },
  playBtn: {
    backgroundColor: "rgba(29, 185, 84, 0.9)", // Tăng lên 90% - rất rõ ràng
    shadowColor: "#1DB954",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderColor: "rgba(29, 185, 84, 0.4)", // Tăng viền
    borderRadius: 50, // Thay đổi từ 20 thành 50 để tạo hình tròn hoàn hảo
    width: 44, // Thêm width và height bằng nhau
    height: 44,
    justifyContent: 'center', // Center icon
    alignItems: 'center',
  },
});

export default MiniPlayer;
