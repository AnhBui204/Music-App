import images from "@/constants/Images"; // Sử dụng images mapping từ constants
import { Ionicons } from '@expo/vector-icons';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useStats } from './StatsContext';

const screenWidth = Dimensions.get('window').width;

const Statistics = () => {
  const { playCounts } = useStats();

  const totalSongs = Object.keys(playCounts).length;
  const totalPlays = Object.values(playCounts).reduce(
    (sum: number, val: any) => sum + val.count,
    0
  );
  const mostPlayed =
    Object.entries(playCounts).sort((a: any, b: any) => b[1].count - a[1].count)[0]?.[0] ||
    'Chưa có';

  // Tổng số lượt theo genre
  const genreMap: any = {};
  Object.values(playCounts).forEach((data: any) => {
    const { genre, count } = data;
    genreMap[genre] = (genreMap[genre] || 0) + count;
  });

  // Top 3 bài
  const topSongs = Object.entries(playCounts)
    .sort((a: any, b: any) => b[1].count - a[1].count)
    .slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionTitleWrapper}>
        <Text style={styles.sectionTitle}>Thống kê Nghe Nhạc</Text>
        <View style={styles.underline} />
      </View>

      {/* Tổng quan */}
      <View style={styles.card}>
        <Ionicons name="musical-notes" size={24} color="#1DB954" />
        <Text style={styles.statText}>Tổng số bài đã nghe: {totalSongs}</Text>
      </View>
      <View style={styles.card}>
        <Ionicons name="time" size={24} color="#1DB954" />
        <Text style={styles.statText}>Tổng lượt nghe: {totalPlays}</Text>
      </View>
      <View style={styles.card}>
        <Ionicons name="star" size={24} color="#1DB954" />
        <Text style={styles.statText}>Bài nghe nhiều nhất: {mostPlayed}</Text>
      </View>

      {/* Bar Chart */}
      <View style={styles.sectionTitleWrapper}>
  <Text style={styles.sectionTitle}>Lượt nghe theo thể loại</Text>
  <View style={styles.underline} />
</View>
          
      <BarChart
        data={{
          labels: Object.keys(genreMap),
          datasets: [
            {
              data: Object.values(genreMap),
            },
          ],
        }}
        width={screenWidth - 30}
        height={230}
        yAxisLabel=""
        yAxisSuffix="" // Thêm yAxisSuffix bắt buộc
        chartConfig={{
          backgroundColor: '#1e1e1e',
          backgroundGradientFrom: '#1e1e1e',
          backgroundGradientTo: '#1e1e1e',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(29, 185, 84, ${opacity})`,
          labelColor: () => '#fff',
          propsForBackgroundLines: {
            stroke: '#333',
          },
        }}
        style={{ borderRadius: 12 }}
        verticalLabelRotation={0}
      />

      {/* Top 3 bài hát */}
      <View style={styles.sectionTitleWrapper}>
        <Text style={styles.sectionTitle}>Top 3 bài hát nghe nhiều nhất</Text>
        <View style={styles.underline} />
      </View>
      <View style={styles.topContainer}>
        {topSongs.map(([title, data]: any, index) => {
          const songImage = images[(data as any).imageKey] || images.cover;
          const isTop1 = index === 0;

          return (
            <View
              key={title}
              style={[styles.topCard, isTop1 && styles.top1Card]}>
              <Image source={songImage} style={styles.topImage} />

              <View style={styles.songInfo}>
                <Text style={styles.rankText}>
                  {isTop1 ? '👑 Top 1' : `#${index + 1}`}
                </Text>
                <Text style={styles.songTitleTop}>{title}</Text>
                <Text style={styles.songArtist}>
                  {(data as any).artist || 'Không rõ nghệ sĩ'}
                </Text>
                <Text style={styles.songSubtitle}>
                  <Ionicons name="headset" size={16} color="#1DB954" />{' '}
                  {(data as any).count} lượt nghe
                </Text>
              </View>

              <Ionicons
                name="play-circle"
                size={30}
                color="#1DB954"
                style={{ marginLeft: 10 }}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 15 },
  header: {
    fontSize: 24,
    color: '#1DB954',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statText: { color: '#fff', fontSize: 16 },
  chartTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginVertical: 12,
    textAlign: 'center',
  },
  topContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  top1Card: {
    borderWidth: 1,
    borderColor: '#1DB954',
    backgroundColor: '#1f2e1f',
  },
  topImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  rankText: {
    color: '#1DB954',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  songTitleTop: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 2,
  },
  songSubtitle: {
    color: '#bbb',
    fontSize: 13,
    },
    sectionTitleWrapper: {
        marginTop: 20,
        marginBottom: 10,
      },
      sectionTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
      },
      underline: {
        width: 50,
        height: 3,
        backgroundColor: '#1DB954',
        borderRadius: 3,
      },
      
});