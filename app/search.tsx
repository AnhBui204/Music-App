import images from "@/constants/Images";
import MusicService from "@/services/MusicService";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  navigateToPlayScreen: (song: any) => void;
};

const SearchScreen: React.FC<Props> = ({ navigateToPlayScreen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const all = await MusicService.getAllSongs();
      console.log("Tất cả bài hát:", all);

      const filtered = all.filter(
        (song) =>
          song.title?.toLowerCase().includes(query.toLowerCase()) ||
          song.artist?.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);
      Keyboard.dismiss(); // đóng bàn phím
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
    }
  };

  const handleBack = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      {/* Search Input Row */}
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="x" size={22} color="#aaa" style={styles.backIcon} />
        </TouchableOpacity>

        <TextInput
          placeholder="Search by name or artist..."
          placeholderTextColor="#aaa"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={22} color="#aaa" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToPlayScreen(item)}
            style={styles.item}>
            <View style={styles.itemContent}>
              <Image source={images[item.image]} style={styles.image} />
              <View style={styles.textWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy bài hát hoặc ca sĩ nào</Text>
        }
      />

    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: "#fff",
    paddingHorizontal: 8,
  },
  backIcon: {
    padding: 8,
  },
  searchIcon: {
    padding: 8,
  },
  item: {
    paddingVertical: 12,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  artist: {
    color: "#aaa",
    fontSize: 14,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
  },
  emptyText: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
