import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PlayerScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/album-art.jpg" }}
        style={styles.albumArt}
      />
      <Text style={styles.title}>Blinding Lights</Text>
      <Text style={styles.artist}>The Weeknd</Text>

      <View style={styles.controls}>
        <Ionicons name="play-skip-back" size={32} color="#000" />
        <TouchableOpacity>
          <Ionicons name="play-circle" size={64} color="#000" />
        </TouchableOpacity>
        <Ionicons name="play-skip-forward" size={32} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 24 },
  albumArt: { width: 300, height: 300, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 20 },
  artist: { fontSize: 18, color: "#555", marginBottom: 24 },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
});