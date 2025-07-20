// file: components/Favorite/MiniPlayer.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useMusic } from './MusicContext';

const images: Record<string, any> = {
  "cover": require("../../assets/images/cover1.png"),
  "cover1.png": require("../../assets/images/cover1.png"),
  "3107.png": require("../../assets/images/3107.png"),
  "chayvekhovoianh.png": require("../../assets/images/chayvekhovoianh.png"),
  "ghequa.png": require("../../assets/images/ghequa.png"),
  "bentrentanglau.png": require("../../assets/images/bentrentanglau.png"),
  "emgioi.png": require("../../assets/images/emgioi.png"),
  "thichemhoinhieu.png": require("../../assets/images/thichemhoinhieu.png"),
  "lunglo.png": require("../../assets/images/lunglo.png"),
  "cafe.png": require("../../assets/images/cafe.png"),
  "chimsau.png": require("../../assets/images/chimsau.png"),
  "truylung.png": require("../../assets/images/truylung.png"),
};

const IMAGES = {
  cover: require('../../assets/images/cover1.png'),
};

const MiniPlayer = ({ song, isPlaying, togglePlay }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const {
    songs,
    currentSong,
    playSong,
  } = useMusic();

  // Disk spinning
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
    }
  }, [isPlaying]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const skipToNextSong = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong?.id);
    const newIndex = currentIndex >= songs.length - 1 ? 0 : currentIndex + 1;
    playSong(songs[newIndex]);
  };

  const skipToPreviousSong = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong?.id);
    const newIndex = currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    playSong(songs[newIndex]);
  };

  if (!currentSong && !song) return null;

  const displaySong = currentSong || song;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => router.push({
          pathname: '/playscreen',
          params: { song: JSON.stringify(currentSong || song) }
        })}
      >
        <Animated.Image
          source={images[displaySong.imageKey] || images[displaySong.image] || images.cover}
          style={[styles.cover, { transform: [{ rotate }] }]}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {displaySong.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {displaySong.artist}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPreviousSong} style={styles.skipBtn}>
          <Ionicons name="play-skip-back" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNextSong} style={styles.skipBtn}>
          <Ionicons name="play-skip-forward" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(40, 40, 40, 0.85)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 99,
    borderWidth: 0.5,
    borderColor: '#444',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cover: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#1DB954',
    backgroundColor: '#111',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  artist: {
    color: '#bbb',
    fontSize: 11,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playBtn: {
    backgroundColor: '#1DB954',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: '#1DB954',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  skipBtn: {
    padding: 6,
  },
});
