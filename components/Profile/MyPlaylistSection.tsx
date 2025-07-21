import images from "@/constants/Images";
import AuthService from "@/services/AuthService";
import PlaylistService from "@/services/PlaylistService";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  onSelect: (playlist: UserPlaylists) => void;
};

export default function MyPlaylistSection({ onSelect }: Props) {
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylists[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await AuthService.getCurrentUser();
      if (!user) return;

      const userPlaylists = await PlaylistService.getPlaylistsByUser(user.id);
      console.log("Fetched playlists:", userPlaylists);
      setUserPlaylists(userPlaylists);
      setSongs(db.recommendedSongs);
    };

    fetchData();
  }, []);

  const getImageForFirstSong = (songIds: string[]) => {
    if (!songIds || songIds.length === 0) return images.cover;

    const firstSong = songs.find((s) => s.id === songIds[0]);
    return firstSong ? images[firstSong.image] : images.cover; // fallback
  };

  return (
    <>
      <Text style={styles.sectionTitle}>Playlists</Text>
      <View style={styles.playlistSection}>
        {Array.isArray(userPlaylists) &&
          userPlaylists.map((playlist) => (
            <View key={playlist.id} style={styles.playlistItem}>
              <TouchableOpacity
                key={playlist.id}
                style={styles.playlistItem}
                onPress={() => onSelect(playlist)}
              >
                <Image
                  source={getImageForFirstSong(playlist.songIds)}
                  style={styles.playlistImg}
                />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.playlistTitle}>{playlist.name}</Text>
                  <Text style={styles.playlistSub}>
                    {playlist.songIds.length} songs
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}

        {/* <TouchableOpacity style={styles.seeAllBtn}>
          <Text style={styles.seeAllText}>See all playlists</Text>
        </TouchableOpacity> */}
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
    borderColor: "#fff",
  },
  seeAllText: {
    fontWeight: "600",
    color: "#fff",
  },
});
