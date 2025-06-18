import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DrawerContentProps = {
  navigate: (screen: 'Favorite' | 'SavedAlbums' | 'PlayScreen') => void;
  closeDrawer: () => void;
};

const DrawerContent: React.FC<DrawerContentProps> = ({ navigate, closeDrawer }) => {
  const handlePress = (screen: 'Favorite' | 'SavedAlbums' | 'PlayScreen') => {
    navigate(screen);
    closeDrawer();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/cd_disk.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>ABC</Text>
        <Text style={styles.userEmail}>ABC@gmail.com</Text>
      </View>

      {/* Navigation Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handlePress('Favorite')}
        >
          <Ionicons name="heart" size={24} color="#1DB954" />
          <Text style={styles.menuText}>Favorite Music</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handlePress('SavedAlbums')}
        >
          <Ionicons name="disc" size={24} color="#1DB954" />
          <Text style={styles.menuText}>Saved Albums</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handlePress('PlayScreen')}
        >
          <Ionicons name="play-circle" size={24} color="#1DB954" />
          <Text style={styles.menuText}>Now Playing</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#888" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#888',
    fontSize: 14,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
});

export default DrawerContent;