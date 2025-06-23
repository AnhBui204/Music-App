import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DrawerContent from '../Favorite/DrawerContent';
import FavoriteMusic from '../Favorite/FavoriteMusic';
import PlayScreen from '../Favorite/PlayScreen';
import SavedAlbums from '../Favorite/SavedAlbums';

const MusicDrawer = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [screen, setScreen] = useState<'Favorite' | 'SavedAlbums' | 'PlayScreen'>('Favorite');
  const [currentSong, setCurrentSong] = useState(null);

  const navigationView = () => (
    <DrawerContent
      navigate={setScreen}
      closeDrawer={() => drawer.current?.closeDrawer()}
    />
  );

  const getScreenTitle = () => {
    switch (screen) {
      case 'Favorite':
        return '⭐ Favorite Music';
      case 'SavedAlbums':
        return '📀 Saved Albums';
      case 'PlayScreen':
        return '▶️ Now Playing';
      default:
        return '';
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => drawer.current?.openDrawer()}>
            <Ionicons name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.header}>{getScreenTitle()}</Text>
        </View>

        <View style={{ flex: 1 }}>
          {screen === 'Favorite' && (
            <FavoriteMusic
              navigateToPlayScreen={(song) => {
                setCurrentSong(song);
                setScreen('PlayScreen');
              }}
            />
          )}
          {screen === 'SavedAlbums' && <SavedAlbums />}
          {screen === 'PlayScreen' && currentSong && (
            <PlayScreen
              song={currentSong}
              goBack={() => setScreen("Favorite")}
            />
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default MusicDrawer;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 40,
  },
});
