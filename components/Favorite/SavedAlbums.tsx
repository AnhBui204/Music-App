// File: components/SavedAlbums.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import db from "../../db.json";
import AlbumDetail from "./AlbumDetail";
import MiniPlayer from './MiniPlayer';
import { useMusic } from './MusicContext';

const images: Record<string, any> = {
  cover: require("../../assets/images/cover.png"),
};

const SavedAlbums: React.FC = () => {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
  
    const { currentSong, isPlaying, togglePlay } = useMusic();

  useEffect(() => {
    setAlbums(db.savedAlbums); // db.json cần có savedAlbums
  }, []);

  // ✅ Gắn sự kiện onPress
  const renderAlbumItem = ({ item }: any) => (
    <TouchableOpacity style={styles.albumCard} onPress={() => setSelectedAlbum(item)}>
      <Image source={images[item.imageKey]} style={styles.albumCover} />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.albumArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={18} color="#aaa" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
    
    // ✅ Nếu đang chọn album thì hiển thị AlbumDetail
  if (selectedAlbum) {
    return <AlbumDetail album={selectedAlbum} goBack={() => setSelectedAlbum(null)} />;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>📀 Album đã lưu</Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={renderAlbumItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
      <MiniPlayer song={currentSong} isPlaying={isPlaying} togglePlay={togglePlay} />

    </View>
  );
};

export default SavedAlbums;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  albumCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    width: "48%", // khoảng 2 cột
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  albumCover: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  albumInfo: {
    marginBottom: 8,
  },
  albumTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  albumArtist: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 2,
  },
});