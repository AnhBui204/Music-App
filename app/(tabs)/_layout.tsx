import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'home') iconName = 'home';
          else if (route.name === 'music') iconName = 'musical-notes';
          else if (route.name === 'login') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5C5C',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    />
  );
}
