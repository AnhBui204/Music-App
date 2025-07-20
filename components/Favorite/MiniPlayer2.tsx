// components/Favorite/MiniPlayer.tsx
import images from "@/constants/Images";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type MiniPlayerProps = {
  currentSong: any;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  isFavorite,
  onToggleFavorite,
}) => {
  const router = useRouter();

  if (!currentSong) return null;

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
        <TouchableOpacity onPress={onToggleFavorite} style={styles.controlBtn}>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={18}
            color={isFavorite ? "#1DB954" : "#fff"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPause} style={styles.controlBtn}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} style={styles.controlBtn}>
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
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 10,
    height: 64,
  },
  songInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  textInfo: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  artist: {
    color: "#b3b3b3",
    fontSize: 12,
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlBtn: {
    padding: 8,
    marginLeft: 4,
  },
});

export default MiniPlayer;
