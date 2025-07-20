import MiniPlayer from '@/components/Favorite/MiniPlayer';
import { useMusic } from '@/components/Favorite/MusicContext';
import { artists, playLists, recentlyLikedSongs, user } from "@/data/mock";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { currentSong, isPlaying, togglePlay } = useMusic();

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={"#fff"} />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/3107.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {user.stats.playlists.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {user.stats.followers.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {user.stats.following.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Plan + Joined */}
        <Text style={styles.subInfo}>
          Joined: {user.joined}  •  Plan: {user.plan}
        </Text>

        {/* Edit Button */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <Ionicons style={styles.moreBtn} name="ellipsis-horizontal" size={24} color="#fff" />
        </View>
      </View>

      {/* Playlists */}
      <Text style={styles.sectionTitle}>Playlists</Text>
      <View style={styles.playlistSection}>
        {playLists.map((p) => (
          <View key={p.id} style={styles.playlistItem}>
            <Image source={p.cover} style={styles.playlistImg} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.playlistTitle}>{p.playlistTitle}</Text>
              <Text style={styles.playlistSub}>{p.playlistSub} saves</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.seeAllBtn}>
          <Text style={styles.seeAllText}>See all playlists</Text>
        </TouchableOpacity>
      </View>

      {/* Recently Played artists */}
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

      {/* Recently Liked Songs */}
      <Text style={styles.sectionTitle}>Recently Liked Songs</Text>
      <View style={styles.songSection}>
        {recentlyLikedSongs.map((a) => (
          <View key={a.id} style={styles.songItem}>
            <Image source={a.cover} style={styles.songImg} />
            <View>
              <Text style={styles.songTitle}>{a.title}</Text>
              <Text style={styles.songSub}>{a.artist}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Favourite Genres*/}
      <Text style={styles.sectionTitle}>Favorite Genres</Text>
      <View style={styles.genreContainer}>
        {["Pop", "Hip-Hop", "Indie", "EDM"].map((genre) => (
          <View key={genre} style={styles.genreBadge}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 80 }} />
      </ScrollView>
      
      {/* Mini Player */}
      <MiniPlayer song={currentSong} isPlaying={isPlaying} togglePlay={togglePlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  header: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 48,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    color: "#fff",
  },
  followInfo: {
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 16,
  },
  subInfo: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },
  editBtn: {
    backgroundColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: '#fff',
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  moreBtn:{
    backgroundColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: '#fff',
    height: 40,
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    color: "#fff",
  },
  playlistSection: {
    gap: 16,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  playlistImg: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  playlistTitle: {
    fontWeight: "600",
    color: "#fff",
  },
  playlistSub: {
    color: "#bbb",
    fontSize: 12,
  },
  seeAllBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 12,
  },
  seeAllText: {
    fontWeight: "600", color: "#fff",
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
    fontWeight: "600", color: "#fff",
  },
  artistSub: {
    fontSize: 12, color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
    color: "#fff",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#fff",
    padding: 5,
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
    borderColor: '#fff',
    borderWidth: 1,
  },
  genreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  settingsShortcut: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  settingsText: {
    fontWeight: "600",
  },
});