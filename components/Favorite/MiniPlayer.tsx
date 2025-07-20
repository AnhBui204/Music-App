// file: components/Favorite/MiniPlayer.tsx
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAudioPlayer } from './AudioContext';


const MiniPlayer = () => {
    const { currentTrack, isPlaying, togglePlay } = useAudioPlayer();
  
    if (!currentTrack) return null;
  
    return (
      <View style={styles.miniPlayer}>
        <Text style={styles.song}>{currentTrack.title}</Text>
        <TouchableOpacity onPress={togglePlay}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopColor: '#333',
    borderTopWidth: 1,
    zIndex: 100,
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  artist: {
    color: '#aaa',
    fontSize: 12,
  },
});
