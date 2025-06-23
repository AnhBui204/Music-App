import axios from 'axios';

const API = 'http://192.168.106.210:4000'; 

const MusicService = {
  getPlaylists: () => axios.get(`${API}/playlists`),
  getRecommended: () => axios.get(`${API}/recommendedSongs`),
  getNewReleases: () => axios.get(`${API}/newReleases`),
  getTrending: () => axios.get(`${API}/trendingNow`),
};

export default MusicService;
