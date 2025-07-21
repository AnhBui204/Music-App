import axios from 'axios';

const API = 'http://172.16.0.206:4000';

export interface Song {
  id?: string;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
  duration?: string;
  genre?: string;
}

const AdminMusicService = {
  // Lấy tất cả bài hát từ các category
  getAllSongs: async () => {
    try {
      const [recommended, newReleases, trending, popular] = await Promise.all([
        axios.get(`${API}/recommendedSongs`),
        axios.get(`${API}/newReleases`),
        axios.get(`${API}/trendingNow`),
        axios.get(`${API}/popularSongs`)
      ]);

      const allSongs = [
        ...recommended.data.map((song: Song) => ({ ...song, category: 'recommended' })),
        ...newReleases.data.map((song: Song) => ({ ...song, category: 'newReleases' })),
        ...trending.data.map((song: Song) => ({ ...song, category: 'trending' })),
        ...popular.data.map((song: Song) => ({ ...song, category: 'popular' }))
      ];

      return { success: true, data: allSongs };
    } catch (error: any) {
      console.log('Get all songs error:', error);
      return { success: false, error: 'Không thể lấy danh sách bài hát' };
    }
  },

  // Thêm bài hát mới
  addSong: async (song: Song, category: string) => {
    try {
      const endpoint = getEndpointByCategory(category);
      const response = await axios.post(`${API}/${endpoint}`, song);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log('Add song error:', error);
      return { success: false, error: 'Không thể thêm bài hát' };
    }
  },

  // Cập nhật bài hát
  updateSong: async (id: string, song: Song, category: string) => {
    try {
      const endpoint = getEndpointByCategory(category);
      const response = await axios.put(`${API}/${endpoint}/${id}`, song);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log('Update song error:', error);
      return { success: false, error: 'Không thể cập nhật bài hát' };
    }
  },

  // Xóa bài hát
  deleteSong: async (id: string, category: string) => {
    try {
      const endpoint = getEndpointByCategory(category);
      await axios.delete(`${API}/${endpoint}/${id}`);
      return { success: true };
    } catch (error: any) {
      console.log('Delete song error:', error);
      return { success: false, error: 'Không thể xóa bài hát' };
    }
  },

  // Lấy bài hát theo category
  getSongsByCategory: async (category: string) => {
    try {
      const endpoint = getEndpointByCategory(category);
      const response = await axios.get(`${API}/${endpoint}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log('Get songs by category error:', error);
      return { success: false, error: 'Không thể lấy danh sách bài hát' };
    }
  }
};

// Helper function để lấy endpoint theo category
const getEndpointByCategory = (category: string): string => {
  switch (category) {
    case 'recommended':
      return 'recommendedSongs';
    case 'newReleases':
      return 'newReleases';
    case 'trending':
      return 'trendingNow';
    case 'popular':
      return 'popularSongs';
    default:
      return 'recommendedSongs';
  }
};

export default AdminMusicService;
