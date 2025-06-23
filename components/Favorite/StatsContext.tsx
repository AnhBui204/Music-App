import { createContext, useContext, useState } from 'react';
import db from '../../db.json';

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [playCounts, setPlayCounts] = useState({});

  const incrementPlayCount = (title) => {
    const song = db.favorites.find((item) => item.title === title);
    const genre = song?.genre || 'Khác';
    const artist = song?.artist || 'Không rõ';
    const imageKey = song?.imageKey || 'cover';

    setPlayCounts((prev) => {
      const prevEntry = prev[title];
      return {
        ...prev,
        [title]: {
          count: (prevEntry?.count || 0) + 1,
          genre,
          artist,
          imageKey
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
