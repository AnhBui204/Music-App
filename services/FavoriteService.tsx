// services/FavoriteService.ts
import axios from 'axios';

const API = 'http://192.168.106.210:4000';

const FavoriteService = {
  getFavorites: () => axios.get(`${API}/favorites`),

  addToFavorites: (song: any) =>
    axios.post(`${API}/favorites`, song),

  removeFavorite: (id: string) =>
    axios.delete(`${API}/favorites/${id}`),

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
