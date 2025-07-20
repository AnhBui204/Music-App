// components/AlbumDetail.tsx
import { FontAwesome, Ionicons } from "@expo/vector-icons";
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

import { Album, Song } from "./SavedAlbums";

const images: Record<string, any> = {
  cover: require("../../assets/images/cover.png"),
};
const audioFiles: { [key: string]: any } = {
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
const songImages: { [key: string]: any } = {
  '3107.png': require('../../assets/images/3107.png'),
  'ghequa.png': require('../../assets/images/ghequa.png'),
  'chayvekhovoianh.png': require('../../assets/images/chayvekhovoianh.png'),
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

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

const playSong = async (song: Song) => {
  try {
    if (!song.audioUrl) {
      alert("Bài hát này không có tệp audio.");
      return;
    }

    const audioSource = audioFiles[song.audioUrl];

    if (!audioSource) {
      alert(`Không tìm thấy file audio: ${song.audioUrl}`);
      return;
    }

    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(audioSource, {
      shouldPlay: true,
    }, onPlaybackStatusUpdate);

    setSound(newSound);
    setCurrentSongId(song.id);
    setIsPlaying(true);
  } catch (error) {
    console.error("Lỗi phát bài hát:", error);
  }
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
    <TouchableOpacity onPress={() => playSong(item)} style={styles.songItem}>
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
        <TouchableOpacity>
          <FontAwesome name="thumbs-up" size={22} color="#1DB954" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="thumbs-down" size={22} color="#888" />
        </TouchableOpacity>
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
          onPress={() => songs[0] && playSong(songs[0])}
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
