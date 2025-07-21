// /*
// TODO:
// - Hàm lấy danh sách recommendedSongs từ db.json, sau đó dựa
// trên danh sách songIds trong playlist để trả về các ảnh cho playlist thumbnail.
// - Nếu playlist >= 4 songs, thì lấy 4 ảnh nhạc đầu tiên cho thumbnail, 
// ngược lại thì lấy 1 ảnh đầu tiên duy nhất.
// */

// import songs from "./";

// export const getCoverImagesFromPlaylist = (playlistSongs: string[]) => {
//   const coverImages = playlistSongs
//     .map((songId) => {
//       const song = songs.find((s) => s.id === songId);
//       return song ? song.image : null;
//     })
//     .filter(Boolean); // remove null

//   return coverImages.slice(0, 4); // lấy tối đa 4 ảnh
// };