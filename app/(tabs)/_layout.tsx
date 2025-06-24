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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5C5C',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    />
</StatsProvider>
  );
}