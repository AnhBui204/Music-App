import axios from 'axios';

// const API = 'http://10.13.2.126:4000';// đây là địa chỉ IP của FPT     
const API = 'http://172.16.0.206:4000'; //đây là địa chỉ IP của Anh Bùi  

// const API = 'http://192.168.56.1:4000'; // Phương Anh
// lệnh chạy BE:  npx json-server --watch db.json --port 4000

const MusicService = {
  getPlaylists: () => axios.get(`${API}/playlists`),
  getRecommended: () => axios.get(`${API}/recommendedSongs`),
  getNewReleases: () => axios.get(`${API}/newReleases`),
  getTrending: () => axios.get(`${API}/trendingNow`),
  getPopularSongs: () => axios.get(`${API}/popularSongs`),
  getAllSongs: async () => {
    const [recommended, newReleases, trending, popular] = await Promise.all([
      axios.get(`${API}/recommendedSongs`),
      axios.get(`${API}/newReleases`),
      axios.get(`${API}/trendingNow`),
      axios.get(`${API}/popularSongs`)
    ]);

    // Gộp và loại trùng bài hát theo id
    const allSongs = [...recommended.data, ...newReleases.data, ...trending.data, ...popular.data];
    const uniqueSongs = Array.from(new Map(allSongs.map(song => [song.id, song])).values());

    return uniqueSongs;
  }
};

export default MusicService;
