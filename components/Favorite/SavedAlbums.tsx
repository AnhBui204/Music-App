import MusicService from "@/services/MusicService";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AlbumDetail from "./AlbumDetail";

export interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  duration: string;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  createdAt: string;
  userId: string;
  songs: Song[];
}

const images: Record<string, any> = {
  cover: require("../../assets/images/cover.png"),
  // thêm ảnh khác nếu cần
};

const SavedAlbums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await MusicService.getAlbum();
        setAlbums(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu album:", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleDeleteAlbum = async (albumId: string) => {
    try {
      await MusicService.deleteAlbum(albumId);
      setAlbums(prev => prev.filter(album => album.id !== albumId));
    } catch (error) {
      console.error("Lỗi khi xóa album:", error);
    }
  };

  const confirmDelete = (albumId: string) => {
    Alert.alert(
      "Xóa album?",
      "Bạn có chắc muốn xóa album này không?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", style: "destructive", onPress: () => handleDeleteAlbum(albumId) },
      ]
    );
  };

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <TouchableOpacity
      style={styles.albumCard}
      onPress={() => setSelectedAlbum(item)}
      activeOpacity={0.8}
    >
      <Image
        source={images[item.songs?.[0]?.image] || images["cover"]}
        style={styles.albumCover}
      />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {item.title || "Chưa có tên"}
        </Text>
        <Text style={styles.albumArtist}>
          {item.songs?.[0]?.artist || "Không rõ nghệ sĩ"}
        </Text>
      </View>
      <TouchableOpacity onPress={() => confirmDelete(item.id)}>
        <Ionicons name="trash-outline" size={18} color="#f66" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (selectedAlbum) {
    return <AlbumDetail album={selectedAlbum} goBack={() => setSelectedAlbum(null)} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>📀 Album đã lưu</Text>
      {albums.length === 0 ? (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
          Không có album nào được lưu.
        </Text>
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          renderItem={renderAlbumItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    width: "48%",
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
