// app/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  useEffect(() => {
    const checkLogin = async () => {
      await AsyncStorage.removeItem('user');

      const user = await AsyncStorage.getItem('user');
      if (user) {
        // router.replace('../../HomePage/HomePage');
        router.replace('/auth/LoginScreen');
      } else {
        router.replace('/auth/LoginScreen');
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2ecc71" />
    </View>
  );
}
