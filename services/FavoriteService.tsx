// services/FavoriteService.ts
import axios from 'axios';

const API = 'http://172.16.0.206:4000';

const FavoriteService = {
  getFavorites: () => axios.get(`${API}/favorites`),

  addToFavorites: (song: any) =>
    axios.post(`${API}/favorites`, song),

  removeFavorite: (id: string) =>
    axios.delete(`${API}/favorites/${id}`),

  // Method mới để xóa favorite theo songId và userId
  removeFromFavorites: async (songId: string, userId: string) => {
    try {
      // Tìm favorite theo song title/id và userId (không phải ID của favorite record)
      const res = await axios.get(`${API}/favorites?userId=${userId}`);
      const favoriteToRemove = res.data.find((fav: any) => fav.id === songId || fav.title === songId);
      
      if (favoriteToRemove) {
        // Xóa sử dụng ID thật của favorite record (auto-generated bởi json-server)
        await axios.delete(`${API}/favorites/${favoriteToRemove.id}`);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },

  getFavoritesByUser: async (userId: string) => {
    try {
      const res = await axios.get(`${API}/favorites?userId=${userId}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },
};

export default FavoriteService;
