// components/Favorite/FavoritesContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import FavoriteService from '../../services/FavoriteService';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites từ server khi component mount
  useEffect(() => {
    loadFavoriteIds();
  }, []);

  const loadFavoriteIds = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (!user) return;

      const favorites = await FavoriteService.getFavoritesByUser(user.id);
      const ids = favorites.map((fav: any) => fav.id);
      setFavoriteIds(ids);
    } catch (error) {
      console.error('Error loading favorite ids:', error);
    }
  };

  const addFavorite = async (song: any, userId: string) => {
    try {
      const favoriteSong = {
        ...song,
        userId,
        imageKey: song.image || "cover",
        audioUrl: song.audioUrl || "music.mp3",
      };

      await FavoriteService.addToFavorites(favoriteSong);
      setFavoriteIds((prev) => [...prev, song.id]);
      Alert.alert("Thành công", "Đã thêm vào mục yêu thích!");
    } catch (error) {
      console.error("Lỗi thêm favorite:", error);
      Alert.alert("Lỗi", "Không thể thêm vào yêu thích.");
    }
  };

  const removeFavorite = async (songId: string, userId: string) => {
    try {
      await FavoriteService.removeFavorite(songId);
      setFavoriteIds((prev) => prev.filter((id) => id !== songId));
      Alert.alert("Thành công", "Đã xóa khỏi mục yêu thích!");
    } catch (error) {
      console.error("Lỗi xóa favorite:", error);
      Alert.alert("Lỗi", "Không thể xóa khỏi yêu thích.");
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, setFavoriteIds, addFavorite, removeFavorite, loadFavoriteIds }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
