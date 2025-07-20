import images from "@/constants/Images";
import MusicService from "@/services/MusicService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type SongItem = {
  id: string;
  title: string;
  artist: string;
  image: string; 
  duration?: string;
};
export default function CreateAlbumScreen() {
  const [albumName, setAlbumName] = useState("");
const [songs, setSongs] = useState<SongItem[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
const [userId, setUserId] = useState<string | null>(null);
useEffect(() => {
  const fetchSongs = async () => {
    const allSongs = await MusicService.getAllSongs();
    setSongs(allSongs); 
  };
  fetchSongs();
}, []);
useEffect(() => {
  const fetchUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id); 
    }
  };

  fetchUser();
}, []);

  const toggleSelect = (songId: string) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };


const handleSaveAlbum = async () => {
  if (!albumName.trim()) {
    Alert.alert("Lỗi", "Vui lòng nhập tên album.");
    return;
  }

  if (!userId) {
    Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
    return;
  }

  if (selectedSongs.length === 0) {
    Alert.alert("Lỗi", "Vui lòng chọn ít nhất một bài hát.");
    return;
  }

  const selectedSongObjects = songs.filter((song) =>
    selectedSongs.includes(song.id)
  );

  const newAlbum = {
    id: Date.now().toString(),
    title: albumName.trim(),
    createdAt: new Date().toISOString(),
    userId,
    songs: selectedSongObjects,
  };

  await MusicService.createAlbum(newAlbum);
  Alert.alert("Thành công", "Album đã được lưu!");
  router.back();
};




  return (
    
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
  <Icon name="chevron-back" size={24} color="#fff" />
  <Text style={styles.backText}>Trang chủ</Text>
</TouchableOpacity>

      <Text style={styles.title}>🎼 Tạo Album Mới</Text>

      <TextInput
        placeholder="Nhập tên album..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={albumName}
        onChangeText={setAlbumName}
      />

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Image source={images[item.image]} style={styles.songImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleSelect(item.id)}>
              <Icon
                name={selectedSongs.includes(item.id) ? "remove-circle" : "add-circle"}
                size={26}
                color={selectedSongs.includes(item.id) ? "red" : "#1DB954"}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAlbum}>
        <Text style={styles.saveText}>💾 Lưu Album</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 16,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  songTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  songArtist: {
    color: "#aaa",
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 16,
},
backText: {
  color: "#fff",
  fontSize: 16,
  marginLeft: 6,
},

});
