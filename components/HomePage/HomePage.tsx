import Header from '@/components/Header/Header';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const chunkArray = (arr: SongItem[], size: number): SongItem[][] => {
  const result: SongItem[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

type SongItem = {
  id: string;
  title: string;
  artist: string;
  image: any;
  duration?: string;
};

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);


type PlaylistItem = {
  id: string;
  title: string;
  image: any;
};

type PlaylistCardProps = {
  item: PlaylistItem;
};

const PlaylistCard = ({ item }: PlaylistCardProps) => (
  <TouchableOpacity style={styles.playlistCard}>
    <Image source={item.image} style={styles.playlistImage} />
    <Text style={styles.playlistTitle}>{item.title}</Text>
  </TouchableOpacity>
);

type SongCardProps = {
  item: SongItem;
};

const SongCard = ({ item }: SongCardProps) => (
  <TouchableOpacity style={styles.songCard}>
    <Image source={item.image} style={styles.songCardImage} />
    <Text style={styles.songCardTitle} numberOfLines={1}>{item.title}</Text>
    <Text style={styles.songCardArtist} numberOfLines={1}>{item.artist}</Text>
  </TouchableOpacity>
);


type SongRowProps = {
  song: SongItem;
  isLast?: boolean;
};

const SongRow = ({ song, isLast }: SongRowProps) => (
  <View style={[styles.songRow, isLast && { paddingRight: 16 }]}>
    <Image source={song.image} style={styles.songRowImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.songRowTitle}>{song.title}</Text>
      <Text style={styles.songRowArtist}>{song.artist}</Text>
    </View>
    <Icon name="play-circle-outline" size={28} color="#1DB954" />
  </View>
);

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
  { id: '4', title: 'Blinding Lights', artist: 'The Weeknd', image: require('@/assets/images/partial-react-logo.png'), duration: '3:20' },
  { id: '5', title: 'Dance Monkey', artist: 'Tones and I', image: require('@/assets/images/partial-react-logo.png'), duration: '3:30' },
  { id: '6', title: 'Levitating', artist: 'Dua Lipa', image: require('@/assets/images/partial-react-logo.png'), duration: '3:45' },
  { id: '7', title: 'Dance Monkey', artist: 'Tones and I', image: require('@/assets/images/partial-react-logo.png'), duration: '3:30' },
  { id: '8', title: 'Levitating', artist: 'Dua Lipa', image: require('@/assets/images/partial-react-logo.png'), duration: '3:45' },
];

const popularSongs = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', image: require('@/assets/images/partial-react-logo.png') },
  { id: '2', title: 'Dance Monkey', artist: 'Tones and I', image: require('@/assets/images/partial-react-logo.png') },
  { id: '3', title: 'Levitating', artist: 'Dua Lipa', image: require('@/assets/images/partial-react-logo.png') },
  { id: '4', title: 'Peaches', artist: 'Justin Bieber', image: require('@/assets/images/partial-react-logo.png') },
  { id: '5', title: 'Bad Guy', artist: 'Billie Eilish', image: require('@/assets/images/partial-react-logo.png') },
  { id: '6', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', image: require('@/assets/images/partial-react-logo.png') },
  { id: '7', title: 'Bad Guy', artist: 'Billie Eilish', image: require('@/assets/images/partial-react-logo.png') },
  { id: '8', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', image: require('@/assets/images/partial-react-logo.png') },
];

const newReleases = [
  { id: '1', title: 'Paint The Town Red', artist: 'Doja Cat', image: require('@/assets/images/partial-react-logo.png') },
  { id: '2', title: 'Vampire', artist: 'Olivia Rodrigo', image: require('@/assets/images/partial-react-logo.png') },
  { id: '3', title: 'Paint The Town Red', artist: 'Doja Cat', image: require('@/assets/images/partial-react-logo.png') },
  { id: '4', title: 'Vampire', artist: 'Olivia Rodrigo', image: require('@/assets/images/partial-react-logo.png') },
  { id: '5', title: 'Paint The Town Red', artist: 'Doja Cat', image: require('@/assets/images/partial-react-logo.png') },
  { id: '6', title: 'Vampire', artist: 'Olivia Rodrigo', image: require('@/assets/images/partial-react-logo.png') },
  { id: '7', title: 'Paint The Town Red', artist: 'Doja Cat', image: require('@/assets/images/partial-react-logo.png') },
  { id: '8', title: 'Vampire', artist: 'Olivia Rodrigo', image: require('@/assets/images/partial-react-logo.png') },
];

const trendingNow = [
  { id: '1', title: 'Flowers', artist: 'Miley Cyrus', image: require('@/assets/images/partial-react-logo.png') },
  { id: '2', title: 'Calm Down', artist: 'Rema & Selena Gomez', image: require('@/assets/images/partial-react-logo.png') },
  { id: '3', title: 'Flowers', artist: 'Miley Cyrus', image: require('@/assets/images/partial-react-logo.png') },
  { id: '4', title: 'Calm Down', artist: 'Rema & Selena Gomez', image: require('@/assets/images/partial-react-logo.png') },
  { id: '5', title: 'Flowers', artist: 'Miley Cyrus', image: require('@/assets/images/partial-react-logo.png') },
  { id: '6', title: 'Calm Down', artist: 'Rema & Selena Gomez', image: require('@/assets/images/partial-react-logo.png') },
  { id: '7', title: 'Flowers', artist: 'Miley Cyrus', image: require('@/assets/images/partial-react-logo.png') },
  { id: '8', title: 'Calm Down', artist: 'Rema & Selena Gomez', image: require('@/assets/images/partial-react-logo.png') },
];

const recommendedChunks = chunkArray(recommendedSongs, 4);
const newReleaseChunks = chunkArray(newReleases, 4);
const trendingChunks = chunkArray(trendingNow, 4);


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      {/* Playlist Carousel */}
      <SectionTitle title="🔥 Recommended Playlists" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaylistCard item={item} />}
        contentContainerStyle={{ paddingBottom: 12 }}
      />

      {/* Grid song cards */}
      <SectionTitle title="🎧 Recommended Songs" />
      <FlatList
        horizontal
        data={recommendedChunks}
        keyExtractor={(_, index) => 'rec' + index}
        renderItem={({ item }) => (
          <View style={styles.gridWrapper}>
            {item.map((song: SongItem) => (
              <SongCard key={song.id} item={song} />
            ))}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      />



      {/* Song rows */}
      <SectionTitle title="🆕 New Releases" />
      <FlatList
        horizontal
        data={chunkArray(newReleases, 4)}
        keyExtractor={(_, index) => 'new-' + index}
        renderItem={({ item }) => (
          <View style={styles.songRowChunk}>
            {item.map((song: SongItem) => (
              <SongRow key={song.id} song={song} />
            ))}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      />



      <SectionTitle title="📈 Trending Now" />
      <FlatList
        horizontal
        data={chunkArray(trendingNow, 4)}
        keyExtractor={(_, index) => 'trend-' + index}
        renderItem={({ item }) => (
          <View style={styles.songRowChunk}>
            {item.map((song: SongItem) => (
              <SongRow key={song.id} song={song} />
            ))}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 12,
  },

  // Playlist
  playlistCard: {
    width: 120,
    marginRight: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
  },
  playlistImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  // Grid Songs
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: width - 32,
  },

  songCard: {
    width: (width - 48) / 2,
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    marginBottom: 16,
    padding: 10,
  },
  songCardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  songCardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  songCardArtist: {
    color: '#aaa',
    fontSize: 12,
  },

  // Song Row
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songRowImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  songRowTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  songRowArtist: {
    color: '#aaa',
    fontSize: 12,
  },
  songRowChunk: {
    width,
    paddingRight: 40, // tránh bị sát lề phải
  },
});