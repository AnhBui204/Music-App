import axios from 'axios';

const API = 'http://118.69.34.209:4000'; 

const MusicService = {
  getPlaylists: () => axios.get(`${API}/playlists`),
  getRecommended: () => axios.get(`${API}/recommendedSongs`),
  getNewReleases: () => axios.get(`${API}/newReleases`),
  getTrending: () => axios.get(`${API}/trendingNow`),
};

export default MusicService;
