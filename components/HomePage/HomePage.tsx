import Header from '@/components/Header/Header';
import MusicService from '@/services/MusicService'; // File API call
import { DrawerActions } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const images: Record<string, any> = {
  // Playlists
  "vietnam-top.png": require("../../assets/images/vietnam-top.png"),
  "gym-playlist.jpg": require("../../assets/images/gym-playlist.jpg"),
  "lofi-playlist.png": require("../../assets/images/lofi-playlist.png"),
  "ballad.png": require("../../assets/images/ballad.png"),
  "remix.png": require("../../assets/images/remix.png"),

  // Recommended Songs
  "3107.png": require("../../assets/images/3107.png"),
  "chayvekhovoianh.png": require("../../assets/images/chayvekhovoianh.png"),
  "ghequa.png": require("../../assets/images/ghequa.png"),
  "bentrentanglau.png": require("../../assets/images/bentrentanglau.png"),
  "emgioi.png": require("../../assets/images/emgioi.png"),
  "thichemhoinhieu.png": require("../../assets/images/thichemhoinhieu.png"),
  "lunglo.png": require("../../assets/images/lunglo.png"),
  "coem.png": require("../../assets/images/coem.png"),

  // Popular Songs
  "saigondaulongqua.png": require("../../assets/images/saigondaulongqua.png"),
  "cafe.png": require("../../assets/images/cafe.png"),
  "chimsau.png": require("../../assets/images/chimsau.png"),
  "truylung.png": require("../../assets/images/truylung.png"),
  "yeu5.png": require("../../assets/images/yeu5.png"),
  "anhdalacvao.png": require("../../assets/images/anhdalacvao.png"),
  "simplelove.png": require("../../assets/images/simplelove.png"),
  "tet.png": require("../../assets/images/tet.png"),

  // New Releases
  "mtp.png": require("../../assets/images/mtp.png"),
  "nal.png": require("../../assets/images/nal.png"),
  "grey.png": require("../../assets/images/grey.png"),
  "khunglong.png": require("../../assets/images/khunglong.png"),
  "traochoanh.png": require("../../assets/images/traochoanh.png"),
  "tung.png": require("../../assets/images/tung.png"),
  "tutinh.png": require("../../assets/images/tutinh.png"),
  "motdem.png": require("../../assets/images/motdem.png"),

  // Trending Now
  "seetinh.png": require("../../assets/images/seetinh.png"),
  "emla.png": require("../../assets/images/emla.png"),
  "phiasau.png": require("../../assets/images/phiasau.png"),
  "lalung.png": require("../../assets/images/lalung.png"),
  "ruou.png": require("../../assets/images/ruou.png"),
  "neulucdo.png": require("../../assets/images/neulucdo.png"),
  "yeuladay.png": require("../../assets/images/yeuladay.png"),
  "hong.png": require("../../assets/images/hong.png"),
  cover: require("../../assets/images/cover.png"),
};


const { width } = Dimensions.get('window');

type SongItem = {
  id: string;
  title: string;
  artist: string;
  image: string; // URI string từ db
  duration?: string;
};

type PlaylistItem = {
  id: string;
  title: string;
  image: string;
};

const chunkArray = (arr: SongItem[], size: number): SongItem[][] => {
  const result: SongItem[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const PlaylistCard = ({ item }: { item: PlaylistItem }) => (
  <TouchableOpacity style={styles.playlistCard}>
    <Image source={images[item.image]} style={styles.playlistImage} />
    <Text style={styles.playlistTitle}>{item.title}</Text>
  </TouchableOpacity>
);

const SongCard = ({ item }: { item: SongItem }) => (
  <TouchableOpacity style={styles.songCard}>
    <Image source={images[item.image]} style={styles.songCardImage} />
    <Text style={styles.songCardTitle} numberOfLines={1}>{item.title}</Text>
    <Text style={styles.songCardArtist} numberOfLines={1}>{item.artist}</Text>
  </TouchableOpacity>
);

const SongRow = ({ song }: { song: SongItem }) => (
  <View style={styles.songRow}>
    <Image source={images[song.image]} style={styles.songRowImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.songRowTitle}>{song.title}</Text>
      <Text style={styles.songRowArtist}>{song.artist}</Text>
    </View>
    <Icon name="play-circle-outline" size={28} color="#1DB954" />
  </View>
);

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const user = typeof params.user === 'string' ? JSON.parse(params.user) : params.user;

  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<SongItem[]>([]);
  const [newReleases, setNewReleases] = useState<SongItem[]>([]);
  const [trendingNow, setTrendingNow] = useState<SongItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pl, rec, news, trend] = await Promise.all([
          MusicService.getPlaylists(),
          MusicService.getRecommended(),
          MusicService.getNewReleases(),
          MusicService.getTrending(),
        ]);
        setPlaylists(pl.data);
        setRecommendedSongs(rec.data);
        setNewReleases(news.data);
        setTrendingNow(trend.data);
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      }
    };
    fetchData();
  }, []);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Header openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </View>

      <SectionTitle title="🔥 Playlist Gợi Ý" />
      <FlatList
        horizontal
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaylistCard item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingBottom: 12 }}
      />

      <SectionTitle title="🎧 Nhạc Đề Xuất" />
      <FlatList
        horizontal
        data={chunkArray(recommendedSongs, 4)}
        keyExtractor={(_, index) => 'rec' + index}
        renderItem={({ item }) => (
          <View style={styles.gridWrapper}>
            {item.map((song) => (
              <SongCard key={song.id} item={song} />
            ))}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      />

      <SectionTitle title="🆕 Nhạc Mới Phát Hành" />
      <FlatList
        horizontal
        data={chunkArray(newReleases, 4)}
        keyExtractor={(_, index) => 'new' + index}
        renderItem={({ item }) => (
          <View style={styles.songRowChunk}>
            {item.map((song) => (
              <SongRow key={song.id} song={song} />
            ))}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      />

      <SectionTitle title="📈 Thịnh Hành" />
      <FlatList
        horizontal
        data={chunkArray(trendingNow, 4)}
        keyExtractor={(_, index) => 'trend' + index}
        renderItem={({ item }) => (
          <View style={styles.songRowChunk}>
            {item.map((song) => (
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