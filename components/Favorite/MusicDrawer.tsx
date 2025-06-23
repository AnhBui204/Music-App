// file: components/Favorite/MusicDrawer.tsx

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import FavoriteMusic from './FavoriteMusic';
import PlayScreen from './PlayScreen';
import SavedAlbums from './SavedAlbums';
import ListeningStats from './Statistics';
// Tạo custom drawer với avatar + tên
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/cd_disk.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Phương Anh</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MusicDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Favorite"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor.color,
        headerTitleStyle: styles.headerTitleStyle,
        drawerStyle: styles.drawerStyle,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerActiveTintColor: styles.activeTintColor.color,
        drawerInactiveTintColor: styles.inactiveTintColor.color,
        drawerIcon: ({ color, size }) => {
          if (route.name === 'Favorite') {
            return <FontAwesome5 name="heart" size={size} color={color} />;
          } else if (route.name === 'SavedAlbums') {
            return <FontAwesome5 name="compact-disc" size={size} color={color} />;
          } else if (route.name === 'PlayScreen') {
            return <Ionicons name="play-circle" size={size} color={color} />;
          } else if (route.name === 'Statistics') {
            return <Ionicons name="stats-chart" size={size} color={color} />;
          }          
          return <Ionicons name="musical-notes" size={size} color={color} />;
          

        },
        headerTitle: () => (
          <Text style={styles.customHeaderTitle}> Music Player</Text>
        ),
      })}
    >
      <Drawer.Screen
        name="Favorite"
        component={FavoriteMusic}
        options={{ drawerLabel: ' Favorite Music' }}
      />
      <Drawer.Screen
        name="SavedAlbums"
        component={SavedAlbums}
        options={{ drawerLabel: ' Saved Albums' }}
      />
      <Drawer.Screen
        name="PlayScreen"
        component={PlayScreen}
        options={{ drawerLabel: ' Now Playing' }}
      />
      <Drawer.Screen
        name="Statistics"
        component={ListeningStats}
        options={{ drawerLabel: ' Listening Stats' }}
      />

    </Drawer.Navigator>
  );
};

export default MusicDrawer;

//styles
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: {
    color: '#1DB954',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  customHeaderTitle: {
    color: '#1DB954',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerStyle: {
    backgroundColor: '#121212',
  },
  drawerLabelStyle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: -10,
  },
  activeTintColor: {
    color: '#1DB954',
  },
  inactiveTintColor: {
    color: '#ccc',
  },
  // Updated profile section styles (left-aligned)
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
