import { createContext, useContext, useState } from 'react';
import db from '../../db.json';

const StatsContext = createContext({} as any);

export const StatsProvider = ({ children }: any) => {
  // Khởi tạo với dữ liệu rỗng - sẽ được cập nhật khi người dùng phát nhạc
  const [playCounts, setPlayCounts] = useState({} as any);

  const incrementPlayCount = (songId: string) => {
    // Tìm bài hát từ tất cả collections trong db
    let song = null;
    let genre = 'Pop'; // Default genre
    
    // Tìm trong favorites (có genre)
    song = db.favorites.find((item: any) => item.id === songId);
    if (song) {
      genre = song.genre || 'Pop';
    } else {
      // Nếu không tìm thấy, tìm trong các collections khác (không có genre)
      song = db.recommendedSongs.find((item: any) => item.id === songId) ||
             db.popularSongs.find((item: any) => item.id === songId) ||
             db.newReleases.find((item: any) => item.id === songId) ||
             db.trendingNow.find((item: any) => item.id === songId);
    }
    
    // Nếu không tìm thấy bài hát, sử dụng thông tin mặc định
    const id = songId;
    const title = song?.title || 'Unknown Song';
    const artist = song?.artist || 'Không rõ';
    const imageKey = song?.image?.replace('.png', '') || 'cover';

    setPlayCounts((prev: any) => {
      const prevEntry = prev[id];
      return {
        ...prev,
        [id]: {
          count: (prevEntry?.count || 0) + 1,
          genre,
          artist,
          imageKey,
          title // lưu cả title để tiện hiển thị
        }
      };
    });
  };

  return (
    <StatsContext.Provider value={{ playCounts, incrementPlayCount }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);