import { artists } from "@/data/mock";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ArtistSection() {
  return (
    <>
      <Text style={styles.sectionTitle}>Recently Played artists</Text>
      <View style={styles.artistSection}>
        {artists.map((a) => (
          <View key={a.id} style={styles.artistItem}>
            <Image source={a.image} style={styles.artistImg} />
            <View>
              <Text style={styles.artistName}>{a.name}</Text>
              <Text style={styles.artistSub}>{a.followers} followers</Text>
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
  artistSection: {
    gap: 16,
    marginTop: 12,
    marginBottom: 32,
  },
  artistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  artistImg: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  artistName: {
    fontWeight: "600",
    color: "#fff",
  },
  artistSub: {
    fontSize: 12,
    color: "#fff",
  },
});
