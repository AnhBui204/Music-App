// file App.tsx
import React, { useRef, useState } from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DrawerContent from './components/DrawerContent';
import FavoriteMusic from './components/FavoriteMusic';
import SavedAlbums from './components/SavedAlbums'; // ✅ Thêm dòng này
import PlayScreen from './components/PlayScreen';

export default function App() {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  // ✅ Mở rộng thêm 'SavedAlbums'
  const [screen, setScreen] = useState<'Favorite' | 'SavedAlbums' | 'PlayScreen'>('Favorite');

  const navigationView = () => (
    <DrawerContent
      navigate={setScreen}
      closeDrawer={() => drawer.current?.closeDrawer()}
    />
  );

  // ✅ Xử lý tiêu đề tương ứng
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
          {screen === 'Favorite' && <FavoriteMusic />}
          {screen === 'SavedAlbums' && <SavedAlbums />} 
          {screen === 'PlayScreen' && <PlayScreen />}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
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
