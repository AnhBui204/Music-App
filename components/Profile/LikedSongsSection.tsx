// import { recentlyLikedSongs } from "@/data/mock";
import AuthService from "@/services/AuthService";
import FavoriteService from "@/services/FavoriteService";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const images: Record<string, any> = {
  "ghequa.png": require("../../assets/images/ghequa.png"),
  "bentrentanglau.png": require("../../assets/images/bentrentanglau.png"),
  "saigondaulongqua.png": require("../../assets/images/saigondaulongqua.png"),
  "emgioi.png": require("../../assets/images/emgioi.png"),
  "coem.png": require("../../assets/images/coem.png"),
  "mtp.png": require("../../assets/images/mtp.png"),
  "khunglong.png": require("../../assets/images/khunglong.png"),
  "traochoanh.png": require("../../assets/images/traochoanh.png"),
  "grey.png": require("../../assets/images/grey.png"),
  "seetinh.png": require("../../assets/images/seetinh.png"),
};

export default function LikedSongsSection() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const storedUser = await AuthService.getCurrentUser();
        if (!storedUser) return;

        const userId = storedUser.id;
        const data = await FavoriteService.getFavoritesByUser(userId);
        setLikedSongs(data);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedSongs();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      <Text style={styles.sectionTitle}>Recently Liked Songs</Text>
      <View style={styles.songSection}>
        {likedSongs.map((song: any) => (
          <View key={song.id} style={styles.songItem}>
            <Image source={images[song.image]} style={styles.songImg} />

            <View>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songSub}>{song.artist}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    color: "#fff",
  },
  songSection: {
    gap: 16,
    marginTop: 12,
    marginBottom: 32,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  songImg: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  songTitle: {
    fontWeight: "600",
    color: "#fff",
  },
  songSub: {
    fontSize: 12,
    color: "#999",
  },
});