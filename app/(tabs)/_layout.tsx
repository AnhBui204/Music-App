// file app/tabs/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatsProvider } from '../../components/Favorite/StatsContext';

export default function TabLayout() {
  return (
    <StatsProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';
            if (route.name === 'home') iconName = 'home';
            else if (route.name === 'music') iconName = 'musical-notes';
            else if (route.name === 'profile') iconName = 'person';
            else if (route.name === 'settings') iconName = 'settings';
            else if (route.name === 'admin') iconName = 'shield-checkmark';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF5C5C',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Trang chủ',
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: 'Nhạc',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Hồ sơ',
          }}
        />
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Cài đặt',
          }}
        />
      </Tabs>
    </StatsProvider>
  );
}