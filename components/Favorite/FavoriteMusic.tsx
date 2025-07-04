// file components/FavoriteMusic.tsx
// components/Favorite/FavoriteMusic.tsx
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import db from "../../db.json";

const images: Record<string, any> = {
  cover: require("../../assets/images/cover.png"),
};



const FavoriteMusic = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setFavoriteSongs(db.favorites);
  }, []);

  const handlePressSong = (song: any) => {
    navigation.navigate("PlayScreen", { song });
  };

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.headerBox}>
        <View style={styles.iconWrapper}>
          <FontAwesome name="thumbs-up" size={72} color="white" />
        </View>
        <Text style={styles.title}>Nhạc đã thích</Text>
        <Text style={styles.userName}>Phương Anh Đỗ</Text>
        <Text style={styles.songCount}>
          {favoriteSongs.length} bài hát • Hơn 17 giờ
        </Text>
        <Text style={styles.description}>
          Nhạc mà bạn nhấn nút thích trong ứng dụng YouTube sẽ xuất hiện ở đây.
          Bạn có thể thay đổi tùy chọn cài đặt này trong phần Cài đặt.
        </Text>

        {/* Play Buttons */}
        <View style={styles.playButtons}>
          <Ionicons name="shuffle" size={24} color="#fff" />
          <TouchableOpacity style={styles.playCircle}>
            <Ionicons name="play" size={30} color="#000" />
          </TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </View>
      </View>

      <Text style={styles.sortText}>
        <Ionicons name="menu" size={24} color="#ccc" /> Sắp xếp
      </Text>

      <FlatList
        data={favoriteSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressSong(item)}
            style={styles.songItem}
          >
            <Image source={images[item.imageKey]} style={styles.cover} />
            <View style={styles.info}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>

            <View style={styles.iconGroup}>
              <FontAwesome name="thumbs-up" size={22} color="#1DB954" style={styles.icon} />
              <FontAwesome name="thumbs-down" size={22} color="#888" style={styles.icon} />
              <Ionicons name="ellipsis-vertical" size={20} color="#fff" style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoriteMusic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 12,
  },
  icon: {
    marginHorizontal: 6,
  },

  headerBox: {
    alignItems: "center",
    marginBottom: 40,
    paddingVertical: 30,
    //   backgroundColor: '#1e1e1e',
    borderRadius: 12,
  },
  iconWrapper: {
    backgroundColor: "#1DB954",
    padding: 50,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  userName: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 6,
  },
  songCount: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
  description: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginTop: 14,
    marginHorizontal: 20,
    lineHeight: 20,
  },
  playButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginTop: 24,
    alignItems: "center",
  },
  playCircle: {
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 14,
  },
  sortText: {
    color: "#ccc",
    marginBottom: 10,
    fontSize: 18,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "#121212",
    borderBottomWidth: 1,
  },
  cover: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  artist: {
    color: "#bbb",
    fontSize: 15,
    marginTop: 2,
  },
});