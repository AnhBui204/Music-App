import axios from "axios";

const API_URL = "http://192.168.106.184:4000/userPlaylists";

const getAllPlaylists = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getPlaylistsByUser = async (userId: string | number) => {
  const response = await axios.get(`${API_URL}?userId=${userId}`);
  return response.data;
};

const getPlaylistById = async (playlistId: string | number) => {
  const response = await axios.get(`${API_URL}/${playlistId}`);
  return response.data;
};

const createPlaylist = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const updatePlaylist = async (id: string | number, data: any) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

const deletePlaylist = async (id: string | number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getAllPlaylists,
  getPlaylistsByUser,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
