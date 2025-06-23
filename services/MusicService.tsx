import axios from 'axios';

<<<<<<< Updated upstream
const API = 'http://192.168.106.210:4000'; 
=======
const API = 'http://192.168.106.210:4000';// đây là địa chỉ IP của Anh Bùi     

// const API = 'http://192.168.56.1:4000'; // đây là địa chỉ IP của Phương Anh
// lệnh chạy BE:  npx json-server --watch db.json --port 4000
>>>>>>> Stashed changes

const MusicService = {
  getPlaylists: () => axios.get(`${API}/playlists`),
  getRecommended: () => axios.get(`${API}/recommendedSongs`),
  getNewReleases: () => axios.get(`${API}/newReleases`),
  getTrending: () => axios.get(`${API}/trendingNow`),
  getAllSongs: async () => {
  const [recommended, newReleases, trending] = await Promise.all([
    axios.get(`${API}/recommendedSongs`),
    axios.get(`${API}/newReleases`),
    axios.get(`${API}/trendingNow`)
  ]);

  // Gộp và loại trùng bài hát theo id
  const allSongs = [...recommended.data, ...newReleases.data, ...trending.data];
  const uniqueSongs = Array.from(new Map(allSongs.map(song => [song.id, song])).values());

  return uniqueSongs;
}
};

export default MusicService;
