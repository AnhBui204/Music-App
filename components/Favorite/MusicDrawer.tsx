// MusicDrawer.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  DrawerLayoutAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DrawerContent from '../Favorite/DrawerContent';
import FavoriteMusic from '../Favorite/FavoriteMusic';
import PlayScreen from '../Favorite/PlayScreen';
import SavedAlbums from '../Favorite/SavedAlbums';

export default function MusicDrawer() {
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
        return 'Favorite Music';
      case 'SavedAlbums':
        return 'Saved Albums';
      case 'PlayScreen':
        return 'Now Playing';
      default:
        return '';
    }
  };

  const getScreenIcon = () => {
    switch (screen) {
      case 'Favorite':
        return '♥️';
      case 'SavedAlbums':
        return '💿';
      case 'PlayScreen':
        return '🎵';
      default:
        return '';
    }
  };


   return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={280}
        drawerPosition="left"
        renderNavigationView={navigationView}
        drawerBackgroundColor="#121212"
      >
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => drawer.current?.openDrawer()}
            >
              <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerContainer}>
              <Text style={styles.headerIcon}>{getScreenIcon()}</Text>
              <Text style={styles.header}>{getScreenTitle()}</Text>
            </View>
          </View>

          <View style={styles.content}>
            {screen === 'Favorite' && (
              <FavoriteMusic
                navigateToPlayScreen={(song) => {
                  setCurrentSong(song);
                  setScreen('PlayScreen');
                }}
              />
            )}
            {screen === 'SavedAlbums' && <SavedAlbums />}
            {screen === 'PlayScreen' && (
              <PlayScreen
                song={currentSong}
                goBack={() => setScreen("Favorite")}
              />
            )}
          </View>
        </View>
      </DrawerLayoutAndroid>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    backgroundColor: '#121212',
  },
});