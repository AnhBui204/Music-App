import { recommendedPlaylists } from "@/data/mock";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />

      <Text style={styles.sectionTitle}>Your top mixes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {recommendedPlaylists.map((item) => (
          <TouchableOpacity style={styles.mixCard} key={item.id}>
            <Image source={item.image} style={styles.mixImage} />
            <Text style={styles.mixTitle}>{item.title}</Text>
            <Text style={styles.mixSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Your recent rotation</Text>
      <View style={styles.recentRow}>
        <Image
          source={{ uri: "https://i.imgur.com/pinkcover.jpg" }}
          style={styles.recentImage}
        />
        <View>
          <Text style={styles.recentTitle}>Oh It's You</Text>
          <Text style={styles.recentArtist}>babychair</Text>
        </View>
      </View>

      {/* Add more sections below if needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  mixCard: {
    width: 160,
    marginRight: 16,
  },
  mixImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  mixTitle: {
    fontWeight: "600",
    marginTop: 8,
  },
  mixSubtitle: {
    fontSize: 12,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  recentImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },
  recentTitle: {
    fontWeight: "600",
  },
  recentArtist: {
    fontSize: 12,
  },
});
