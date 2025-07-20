// file: components/Favorite/MusicContext.tsx
import { Audio } from 'expo-av';
import { createContext, useContext, useRef, useState } from 'react';
import db from '../../db.json';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const [songs, setSongs] = useState(db.favorites); // ✅
  const [mode, setMode] = useState('repeatOne');

  const soundRef = useRef(null);

  const playSong = async (song) => {
    console.log('MusicContext: playSong called with:', song.title);
    
    if (soundRef.current) {
      console.log('MusicContext: Unloading previous sound');
      await soundRef.current.unloadAsync();
    }

    console.log('MusicContext: Loading new sound');
    const { sound, status } = await Audio.Sound.createAsync(
      require('../../assets/music.mp3'),
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );

    soundRef.current = sound;
    setCurrentSong(song);
    setIsPlaying(true);
    setDuration(status.durationMillis);
    console.log('MusicContext: Song set and playing:', song.title);
  };

  const handleTrackEnd = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    switch (mode) {
      case 'repeatOne':
        await soundRef.current.setPositionAsync(0);
        await soundRef.current.playAsync();
        break;
      case 'repeatAll':
        const nextIndex = (currentIndex + 1) % songs.length;
        await playSong(songs[nextIndex]);
        break;
      case 'shuffle':
        const randomIndex = Math.floor(Math.random() * songs.length);
        await playSong(songs[randomIndex]);
        break;
    }
  };

  const togglePlay = async () => {
    if (!soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) {
        handleTrackEnd();
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        togglePlay,
        playSong,
        duration,
        position,
        soundRef,
        mode,
        setMode,
        songs,       
        setSongs,    
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
