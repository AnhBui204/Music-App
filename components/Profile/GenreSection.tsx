import { StyleSheet, Text, View } from "react-native";

export default function GenreSection() {
  return (
    <>
      <Text style={styles.sectionTitle}>Favorite Genres</Text>
      <View style={styles.genreContainer}>
        {["Pop", "Hip-Hop", "Indie", "EDM"].map((genre) => (
          <View key={genre} style={styles.genreBadge}>
            <Text style={styles.genreText}>{genre}</Text>
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
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 32,
  },
  genreBadge: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
  },
  genreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
