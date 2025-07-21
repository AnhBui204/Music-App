import images from "@/constants/Images";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import db from "../../db.json";

type Song = {
  id: string;
  title: string;
  artist: string;
  image: string;
  duration: string;
  audioUrl: string;
};

type UserPlaylists = {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  userId: string;
};

type Props = {
  playlist: UserPlaylists;
  onBack: () => void;
};

export default function PlaylistDetails({ playlist, onBack }: Props) {
  const songs = db.recommendedSongs.filter((s: Song) =>
    playlist.songIds.includes(s.id)
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{playlist.name}</Text>
      <Text style={styles.desc}>{playlist.description}</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songRow}>
            <Image
              source={images[item.image] || images["cover.png"]}
              style={styles.cover}
            />
            <View>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  back: { marginBottom: 8, color: "#007bff" },
  title: { fontSize: 22, fontWeight: "bold" },
  desc: { color: "gray", marginBottom: 16 },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cover: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 6,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  artist: {
    color: "gray",
  },
});
