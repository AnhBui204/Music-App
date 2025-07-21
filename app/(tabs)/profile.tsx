import ArtistSection from "@/components/Profile/ArtistSection";
import GenreSection from "@/components/Profile/GenreSection";
import LikedSongsSection from "@/components/Profile/LikedSongsSection";
import PlaylistSection from "@/components/Profile/MyPlaylistSection";
import PlaylistDetail from "@/components/Profile/PlayListDetails";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type UserPlaylists = {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  userId: string;
};

export default function ProfileScreen() {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<UserPlaylists | null>(null);

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      {selectedPlaylist ? (
        <PlaylistDetail
          playlist={selectedPlaylist}
          onBack={() => setSelectedPlaylist(null)}
        />
      ) : (
        <PlaylistSection onSelect={(pl) => setSelectedPlaylist(pl)} />
      )}
      {/* <PlaylistSection /> */}
      <LikedSongsSection />
      <ArtistSection />
      <GenreSection />
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "black",
  },
});