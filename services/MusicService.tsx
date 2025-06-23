import axios from 'axios';

// đây là địa chỉ IP của Anh Bùi   const API = 'http://192.168.106.210:4000';  

const API = 'http://192.168.56.1:4000'; // đây là địa chỉ IP của Phương Anh
// lệnh chạy BE:  npx json-server --watch db.json --port 4000

const MusicService = {
  getPlaylists: () => axios.get(`${API}/playlists`),
  getRecommended: () => axios.get(`${API}/recommendedSongs`),
  getNewReleases: () => axios.get(`${API}/newReleases`),
  getTrending: () => axios.get(`${API}/trendingNow`),
};

export default MusicService;
