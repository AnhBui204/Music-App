// file components/DrawerContent.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DrawerContentProps = {
  navigate: (screen: 'Favorite' | 'SavedAlbums' | 'PlayScreen') => void; 
  closeDrawer: () => void;
};

const DrawerContent: React.FC<DrawerContentProps> = ({ navigate, closeDrawer }) => {
  const handlePress = (screen:  'Favorite' | 'SavedAlbums'| 'PlayScreen') => {
    navigate(screen);
    closeDrawer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <TouchableOpacity onPress={() => handlePress('Favorite')}>
        <Text style={styles.item}>⭐ Favorite Music</Text>
      </TouchableOpacity>

      {/* ✅ Thêm mục Saved Albums */}
      <TouchableOpacity onPress={() => handlePress('SavedAlbums')}>
        <Text style={styles.item}>📀 Saved Albums</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('PlayScreen')}>
        <Text style={styles.item}>▶️ Now Playing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
});