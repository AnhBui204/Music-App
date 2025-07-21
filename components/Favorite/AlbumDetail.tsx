// components/AlbumDetail.tsx
import { Ionicons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useMusicPlayer } from './MusicPlayerContext';
import { Album, Song } from "./SavedAlbums";

const images: Record<string, any> = {
  cover: require("../../assets/images/cover.png"),
};

const songImages: { [key: string]: any } = {
  '3107.png': require('../../assets/images/3107.png'),
  "chayvekhovoianh.png": require("../../assets/images/chayvekhovoianh.png"),
  "ghequa.png": require("../../assets/images/ghequa.png"),
  "bentrentanglau.png": require("../../assets/images/bentrentanglau.png"),
  "saigondaulongqua.png": require("../../assets/images/saigondaulongqua.png"),
  "yeu5.png": require("../../assets/images/yeu5.png"),
  "emgioi.png": require("../../assets/images/emgioi.png"),
  "coem.png": require("../../assets/images/coem.png"),
  "mtp.png": require("../../assets/images/mtp.png"),
  "tung.png": require("../../assets/images/tung.png"),
  "khunglong.png": require("../../assets/images/khunglong.png"),
  "traochoanh.png": require("../../assets/images/traochoanh.png"),
  "thichemhoinhieu.png": require("../../assets/images/thichemhoinhieu.png"),
  "lunglo.png": require("../../assets/images/lunglo.png"),
  "cafe.png": require("../../assets/images/cafe.png"),
  "chimsau.png": require("../../assets/images/chimsau.png"),
  "truylung.png": require("../../assets/images/truylung.png"),
  "anhdalacvao.png": require("../../assets/images/anhdalacvao.png"),
  "simplelove.png": require("../../assets/images/simplelove.png"),
  "tet.png": require("../../assets/images/tet.png"),
  "nal.png": require("../../assets/images/nal.png"),
  "grey.png": require("../../assets/images/grey.png"),
  "tutinh.png": require("../../assets/images/tutinh.png"),
  "motdem.png": require("../../assets/images/motdem.png"),
  "seetinh.png": require("../../assets/images/seetinh.png"),
  "emla.png": require("../../assets/images/emla.png"),
  "phiasau.png": require("../../assets/images/phiasau.png"),
  "lalung.png": require("../../assets/images/lalung.png"),
  "ruou.png": require("../../assets/images/ruou.png"),
  "neulucdo.png": require("../../assets/images/neulucdo.png"),
  "yeuladay.png": require("../../assets/images/yeuladay.png"),
  "hong.png": require("../../assets/images/hong.png"),
  "ballad.png": require("../../assets/images/ballad.png"),
  "remix.png": require("../../assets/images/remix.png"),
  'default': require('../../assets/images/cover.png'),
};
interface Props {
  album: Album;
  goBack: () => void;
}


const AlbumDetail: React.FC<Props> = ({ album, goBack }) => {
  const [selectedOptionsId, setSelectedOptionsId] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [songs, setSongs] = useState<Song[]>(album.songs);
  const { playSong } = useMusicPlayer();
  const { playTrack } = useMusicPlayer();

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const handleSongPress = (song: Song) => {
    playTrack(song);
  };

  const shuffleAndPlay = () => {
    if (!album.songs.length) return;

    const randomIndex = Math.floor(Math.random() * album.songs.length);
    const randomSong = album.songs[randomIndex];
    playSong(randomSong);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    setPlaybackStatus(status);

    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 1);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        const index = songs.findIndex(s => s.id === currentSongId);
        const nextIndex = (index + 1) % songs.length;
        playSong(songs[nextIndex]);
      }
    }
  };




  const handleRemove = (id: string) => {
    Alert.alert(
      "Xoá bài hát",
      "Bạn có chắc muốn xoá bài này không?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá", onPress: () => {
            const updated = songs.filter(song => song.id !== id);
            setSongs(updated);
            setSelectedOptionsId(null);
          }
        }
      ]
    );
  };



  const renderItem = ({ item }: { item: Song }) => (
    <View>
      <TouchableOpacity onPress={() => handleSongPress(item)} style={styles.songItem}>
        <Image
          source={songImages[item.image] || songImages["default"]}
          style={styles.cover}
        />
        <View style={styles.info}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => {
            setSelectedOptionsId(prev => prev === item.id ? null : item.id);
          }}>
            <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {selectedOptionsId === item.id && (
        <View style={styles.inlineMenu}>
          <TouchableOpacity onPress={() => handleRemove(item.id)}>
            <Text style={styles.inlineMenuText}>🗑 Xóa bài hát</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image
        source={images["cover"]}
        style={styles.albumCover}
        resizeMode="cover"
      />
      <Text style={styles.title}>{album.title}</Text>
      <Text style={styles.artist}>Tổng cộng: {songs.length} bài</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            if (songs.length > 0) {
              playTrack(songs[0]); 
            }
          }}
        >
          <Ionicons name="play" size={18} color="#000" />
          <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shuffleButton} onPress={shuffleAndPlay}>
          <Ionicons name="shuffle" size={18} color="#fff" />
          <Text style={styles.shuffleText}>Shuffle</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {sound && (
        <View style={styles.playerBar}>
          <TouchableOpacity
            onPress={() => {
              const index = album.songs.findIndex(s => s.id === currentSongId);
              if (index > 0) {
                playSong(songs[index - 1]);
              }
            }}
          >
            <Ionicons name="play-skip-back" size={26} color="#1DB954" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              if (!sound) return;
              if (isPlaying) {
                await sound.pauseAsync();
              } else {
                await sound.playAsync();
              }
            }}
            style={styles.playPauseButton}
          >
            <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={40} color="#1DB954" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const index = album.songs.findIndex(s => s.id === currentSongId);
              const nextIndex = (index + 1) % album.songs.length;
              playSong(songs[nextIndex]);
            }}
          >
            <Ionicons name="play-skip-forward" size={26} color="#1DB954" />
          </TouchableOpacity>

        </View>
      )}
      {sound && isPlaying && (
        <>
          <Text style={{ color: '#ccc', fontSize: 12 }}>
            {Math.floor(position / 60000)}:{String(Math.floor(position / 1000) % 60).padStart(2, '0')} / {Math.floor(duration / 60000)}:{String(Math.floor(duration / 1000) % 60).padStart(2, '0')}
          </Text>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#555"
            thumbTintColor="#1DB954"
            onSlidingComplete={async (value) => {
              if (sound) {
                await sound.setPositionAsync(value);
              }
            }}
          />
        </>
      )}


    </View>
  );
};

export default AlbumDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  albumCover: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  artist: {
    color: "#bbb",
    fontSize: 15,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 14,
    marginVertical: 20,
  },
  playButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  shuffleButton: {
    backgroundColor: "#444",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  playText: {
    color: "#000",
    marginLeft: 6,
    fontWeight: "bold",
  },
  shuffleText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  cover: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  songArtist: {
    color: "#aaa",
    fontSize: 13,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  playerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    borderRadius: 14,
    gap: 24,
  },
  playPauseButton: {
    paddingHorizontal: 8,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 8,
  },
  inlineMenu: {
    backgroundColor: "#333",
    padding: 8,
    marginLeft: 100, // điều chỉnh để đặt đúng vị trí gần ba chấm
    marginBottom: 4,
    borderRadius: 6,
    position: 'absolute',
    right: 16,
    top: 70,
    zIndex: 10,
  },
  inlineMenuText: {
    color: "#fff",
    fontSize: 14,
  },


});
