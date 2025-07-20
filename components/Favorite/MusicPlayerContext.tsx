// components/Favorite/MusicPlayerContext.tsx
import { Audio } from "expo-av";
import { createContext, useContext, useRef, useState } from "react";
import { Alert } from "react-native";
import MusicService from "../../services/MusicService";
import { useFavorites } from "./FavoritesContext";
import { useStats } from "./StatsContext";

type MusicPlayerContextType = {
  currentSong: any;
  isPlaying: boolean;
  songs: any[];
  playTrack: (song: any) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleFavorite: () => void;
  isFavorite: boolean;
  position: number;
  duration: number;
};

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export const MusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const { favoriteIds, addFavorite, removeFavorite } = useFavorites();
  const { incrementPlayCount } = useStats();
  
  const soundRef = useRef(null);

  const audioFiles = {
    '3107.mp3': require('../../assets/audio/3107.mp3'),
    'yeudongkhoqua.mp3': require('../../assets/audio/yeudongkhoqua.mp3'),
    'ghequa.mp3': require('../../assets/audio/ghequa.mp3'),
    'bentrentanglau.mp3': require('../../assets/audio/bentrentanglau.mp3'),
    'saigondaulongqua.mp3': require('../../assets/audio/saigondaulongqua.mp3'),
    'yeu5.mp3': require('../../assets/audio/yeu5.mp3'),
    'emgioi.mp3': require('../../assets/audio/emgioi.mp3'),
    'coem.mp3': require('../../assets/audio/coem.mp3'),
    'ctacuahientai.mp3': require('../../assets/audio/ctacuahientai.mp3'),
    'tung.mp3': require('../../assets/audio/tung.mp3'),
    'khunglong.mp3': require('../../assets/audio/khunglong.mp3'),
    'traochoanh.mp3': require('../../assets/audio/traochoanh.mp3'),
    'thichemhoinhieu.mp3': require('../../assets/audio/thichemhoinhieu.mp3'),
    'lunglo.mp3': require('../../assets/audio/lunglo.mp3'),
    'cafe.mp3': require('../../assets/audio/cafe.mp3'),
    'chimsau.mp3': require('../../assets/audio/chimsau.mp3'),
    'truylung.mp3': require('../../assets/audio/truylung.mp3'),
    'anhdalacvao.mp3': require('../../assets/audio/anhdalacvao.mp3'),
    'simplelove.mp3': require('../../assets/audio/simplelove.mp3'),
    'tet.mp3': require('../../assets/audio/tet.mp3'),
    'dauodaynay.mp3': require('../../assets/audio/dauodaynay.mp3'),
    'duaemvenha.mp3': require('../../assets/audio/duaemvenha.mp3'),
    'tutinh2.mp3': require('../../assets/audio/tutinh2.mp3'),
    'motdem.mp3': require('../../assets/audio/motdem.mp3'),
    'seetinh.mp3': require('../../assets/audio/seetinh.mp3'),
    'emla.mp3': require('../../assets/audio/emla.mp3'),
    'phiasau.mp3': require('../../assets/audio/phiasau.mp3'),
    'lalung.mp3': require('../../assets/audio/lalung.mp3'),
    'ruou.mp3': require('../../assets/audio/ruou.mp3'),
    'neulucdo.mp3': require('../../assets/audio/neulucdo.mp3'),
    'yeuladay.mp3': require('../../assets/audio/yeuladay.mp3'),
    'hong.mp3': require('../../assets/audio/hong.mp3'),
  };

  // Load all songs khi khởi tạo
  const loadSongs = async () => {
    try {
      const allSongs = await MusicService.getAllSongs();
      setSongs(allSongs);
    } catch (error) {
      console.error("Error loading songs:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
      
      if (status.didJustFinish) {
        nextTrack();
      }
    }
  };

  const loadAudio = async (song: any) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const file = song.audioUrl;
      const soundAsset = audioFiles[file];
      
      if (!soundAsset) {
        Alert.alert("Lỗi", "Không tìm thấy file âm thanh");
        return;
      }

      const { sound, status } = await Audio.Sound.createAsync(
        soundAsset,
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      soundRef.current = sound;
      setDuration(status.durationMillis);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error loading audio:", error);
      Alert.alert("Lỗi", "Không thể phát nhạc");
    }
  };

  const playTrack = async (song: any) => {
    // Luôn tăng số lần phát mỗi lần click nếu có id
    if (!song?.id) {
      console.warn('playTrack: song.id is missing!', song);
    } else {
      incrementPlayCount(song.id);
    }
    // Chỉ load audio mới nếu bài hát khác với bài đang phát
    if (!currentSong || (currentSong as any)?.id !== song?.id) {
      setCurrentSong(song);
      await loadAudio(song);
    }
    // Load songs nếu chưa có
    if (songs.length === 0) {
      await loadSongs();
    }
  };

  const togglePlay = async () => {
    if (!soundRef.current) return;
    
    try {
      const status = await soundRef.current.getStatusAsync();
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play:", error);
    }
  };

  const nextTrack = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playTrack(songs[nextIndex]);
  };

  const previousTrack = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    playTrack(songs[prevIndex]);
  };

  const toggleFavorite = async () => {
    if (!currentSong) return;
    
    try {
      // Get user from AsyncStorage (you might want to pass this as prop)
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const storedUser = await AsyncStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      
      if (!user) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập để sử dụng tính năng này");
        return;
      }

      if (isFavorite) {
        await removeFavorite(currentSong.id, user.id);
      } else {
        await addFavorite(currentSong, user.id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const isFavorite = currentSong ? favoriteIds.includes(currentSong.id) : false;

  const value = {
    currentSong,
    isPlaying,
    songs,
    playTrack,
    togglePlay,
    nextTrack,
    previousTrack,
    toggleFavorite,
    isFavorite,
    position,
    duration,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  }
  return context;
};
