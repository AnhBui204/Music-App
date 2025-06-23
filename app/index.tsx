import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // ✅ Đã login → chuyển sang home
          router.replace('/(tabs)/home');
        } else {
          // ❌ Chưa login → chuyển sang login
          router.replace('../auth/LoginScreen');
        }
      } catch (error) {
        console.error('Error checking login:', error);
        router.replace('../auth/LoginScreen');
      }
    };

    checkLogin();
  }, []);

  return null; // Không hiển thị gì trong lúc redirect
}
