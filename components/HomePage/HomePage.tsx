import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from "@/components/Header/Header";

const playlists = [
  { id: '1', title: 'Top Hits', image: require('@/assets/images/partial-react-logo.png') },
  { id: '2', title: 'Workout', image: require('@/assets/images/partial-react-logo.png') },
  { id: '3', title: 'Chill Vibes', image: require('@/assets/images/partial-react-logo.png') },
  { id: '4', title: 'Focus', image: require('@/assets/images/partial-react-logo.png') },
  { id: '5', title: 'Party', image: require('@/assets/images/partial-react-logo.png') },
];

const recommendedSongs = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', image: require('@/assets/images/partial-react-logo.png'), duration: '3:20' },
  { id: '2', title: 'Dance Monkey', artist: 'Tones and I', image: require('@/assets/images/partial-react-logo.png'), duration: '3:30' },
  { id: '3', title: 'Levitating', artist: 'Dua Lipa', image: require('@/assets/images/partial-react-logo.png'), duration: '3:45' },
  { id: '4', title: 'Peaches', artist: 'Justin Bieber', image: require('@/assets/images/partial-react-logo.png'), duration: '3:18' },
  { id: '5', title: 'Bad Guy', artist: 'Billie Eilish', image: require('@/assets/images/partial-react-logo.png'), duration: '3:14' },
];

const popularSongs = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', image: require('@/assets/images/partial-react-logo.png') },
  { id: '2', title: 'Dance Monkey', artist: 'Tones and I', image: require('@/assets/images/partial-react-logo.png') },
  { id: '3', title: 'Levitating', artist: 'Dua Lipa', image: require('@/assets/images/partial-react-logo.png') },
  { id: '4', title: 'Peaches', artist: 'Justin Bieber', image: require('@/assets/images/partial-react-logo.png') },
  { id: '5', title: 'Bad Guy', artist: 'Billie Eilish', image: require('@/assets/images/partial-react-logo.png') },
  { id: '6', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', image: require('@/assets/images/partial-react-logo.png') },
  { id: '7', title: 'Good 4 U', artist: 'Olivia Rodrigo', image: require('@/assets/images/partial-react-logo.png') },
  { id: '8', title: 'Montero', artist: 'Lil Nas X', image: require('@/assets/images/partial-react-logo.png') },
  { id: '9', title: 'Blinding Lights', artist: 'The Weeknd', image: require('@/assets/images/partial-react-logo.png') },
  { id: '10', title: 'Dance Monkey', artist: 'Tones and I', image: require('@/assets/images/partial-react-logo.png') },
  { id: '11', title: 'Levitating', artist: 'Dua Lipa', image: require('@/assets/images/partial-react-logo.png') },
  { id: '12', title: 'Peaches', artist: 'Justin Bieber', image: require('@/assets/images/partial-react-logo.png') },
  { id: '13', title: 'Bad Guy', artist: 'Billie Eilish', image: require('@/assets/images/partial-react-logo.png') },
  { id: '14', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', image: require('@/assets/images/partial-react-logo.png') },
  { id: '15', title: 'Good 4 U', artist: 'Olivia Rodrigo', image: require('@/assets/images/partial-react-logo.png') },
  { id: '16', title: 'Montero', artist: 'Lil Nas X', image: require('@/assets/images/partial-react-logo.png') },
];

const newReleases = [
  { id: '6', title: 'Paint The Town Red', artist: 'Doja Cat', image: require('@/assets/images/partial-react-logo.png') },
  { id: '7', title: 'Vampire', artist: 'Olivia Rodrigo', image: require('@/assets/images/partial-react-logo.png') },
  { id: '8', title: 'Single Soon', artist: 'Selena Gomez', image: require('@/assets/images/partial-react-logo.png') },
];

const trendingNow = [
  { id: '9', title: 'Flowers', artist: 'Miley Cyrus', image: require('@/assets/images/partial-react-logo.png') },
  { id: '10', title: 'Calm Down', artist: 'Rema & Selena Gomez', image: require('@/assets/images/partial-react-logo.png') },
  { id: '11', title: 'Unholy', artist: 'Sam Smith & Kim Petras', image: require('@/assets/images/partial-react-logo.png') },
];

const SongList = ({ title, songs }) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    {songs.map((song) => (
      <View key={song.id} style={styles.songItem}>
        <Image source={song.image} style={styles.songListImg} />
        <View>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
        </View>
        <Icon name="play-circle-outline" size={28} color="#1DB954" />
      </View>
    ))}
  </>
);

const PopularSongRow = ({ songs }) => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={songs}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.popularSongItem}>
        <Image source={item.image} style={styles.popularSongImage} />
        <View style={styles.popularSongInfo}>
          <Text style={styles.popularSongTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.popularSongArtist} numberOfLines={1}>{item.artist}</Text>
        </View>
        <Icon name="play-circle-outline" size={24} color="#1DB954" style={styles.popularSongPlayIcon} />
      </TouchableOpacity>
    )}
    contentContainerStyle={styles.popularSongsContainer}
  />
);

const HomeScreen = () => {
  const popularSongRows = [];
  for (let i = 0; i < popularSongs.length; i += 4) {
    popularSongRows.push(popularSongs.slice(i, i + 4));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <Text style={styles.sectionTitle}>Recommended Playlists</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playlistItem}>
            <Image source={item.image} style={styles.playlistImage} />
            <Text style={styles.playlistText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Recommended Songs</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recommendedSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recommendedSongItem}>
            <Image source={item.image} style={styles.recommendedSongImage} />
            <View style={styles.recommendedSongInfo}>
              <Text style={styles.recommendedSongTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.recommendedSongArtist} numberOfLines={1}>{item.artist}</Text>
              <View style={styles.recommendedSongDuration}>
                <Icon name="time-outline" size={14} color="#aaa" />
                <Text style={styles.recommendedSongDurationText}>{item.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.recommendedSongsContainer}
      />

      <Text style={styles.sectionTitle}>Popular Songs</Text>
      {popularSongRows.map((row, index) => (
        <PopularSongRow key={`row-${index}`} songs={row} />
      ))}

      <SongList title="New Releases" songs={newReleases} />
      <SongList title="Trending Now" songs={trendingNow} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '600',
  },
  playlistItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  playlistImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  playlistText: {
    color: '#fff',
    marginTop: 6,
  },
  recommendedSongsContainer: {
    paddingRight: 16,
  },
  recommendedSongItem: {
    width: 240,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginRight: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedSongImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  recommendedSongInfo: {
    flex: 1,
  },
  recommendedSongTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  recommendedSongArtist: {
    color: '#aaa',
    fontSize: 12,
  },
  recommendedSongDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  recommendedSongDurationText: {
    color: '#aaa',
    marginLeft: 4,
    fontSize: 12,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songListImg: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  songTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  songArtist: {
    color: '#aaa',
    fontSize: 12,
  },
  popularSongsContainer: {
    marginBottom: 16,
  },
  popularSongItem: {
    width: 150,
    marginRight: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularSongImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
  },
  popularSongInfo: {
    flex: 1,
  },
  popularSongTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  popularSongArtist: {
    color: '#aaa',
    fontSize: 12,
  },
  popularSongPlayIcon: {
    marginLeft: 8,
  },
});

export default HomeScreen;
