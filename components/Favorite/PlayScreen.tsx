import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import db from "../../db.json";

// Constants
const IMAGES = {
    cover: require("../../assets/images/cover1.png"),
    cdDisk: require("../../assets/images/cd_disk.png"),
};

const PLAY_MODES = {
    REPEAT_ONE: "repeatOne",
    REPEAT_ALL: "repeatAll",
    SHUFFLE: "shuffle",
};

const PlayScreen = ({ song: initialSong, goBack }) => {
    // State Management
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [mode, setMode] = useState(PLAY_MODES.REPEAT_ONE);
    const [isLiked, setIsLiked] = useState(false);
    const [currentSong, setCurrentSong] = useState(initialSong);
    const [songs, setSongs] = useState([]);

    // Refs
    const soundRef = useRef(null);
    const spinValue = useRef(new Animated.Value(0)).current;
    const rotationRef = useRef(null);

    // Animation Setup
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Effects
    useEffect(() => {
        loadAudio();
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            rotateDisc();
        } else if (rotationRef.current) {
            rotationRef.current.stop();
        }
    }, [isPlaying]);

    useEffect(() => {
        setSongs(db.favorites);
    }, []);


    // Audio Functions
    const loadAudio = async () => {
        if (soundRef.current) {
            await soundRef.current.unloadAsync();
        }

        const { sound, status } = await Audio.Sound.createAsync(
            require("../../assets/music.mp3"),
            { shouldPlay: true },
            onPlaybackStatusUpdate
        );
        soundRef.current = sound;
        setDuration(status.durationMillis);
        setIsPlaying(true);
    };

    const handleSongSelect = async (newSong) => {
        setCurrentSong(newSong);
        setPosition(0);
        // Reset và load audio mới
        await loadAudio();
    };

    const onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            if (status.didJustFinish) {
                handleTrackEnd();
            }
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

    // Helper Functions
    const handleTrackEnd = async () => {
        switch (mode) {
            case PLAY_MODES.REPEAT_ONE:
                await soundRef.current.setPositionAsync(0);
                await soundRef.current.playAsync();
                break;
            case PLAY_MODES.REPEAT_ALL:
                // Add logic for next song
                break;
            case PLAY_MODES.SHUFFLE:
                // Add logic for random song
                break;
        }
    };

    const toggleMode = () => {
        setMode((prev) => {
            if (prev === PLAY_MODES.REPEAT_ALL) return PLAY_MODES.REPEAT_ONE;
            if (prev === PLAY_MODES.REPEAT_ONE) return PLAY_MODES.SHUFFLE;
            return PLAY_MODES.REPEAT_ALL;
        });
    };

    const rotateDisc = () => {
        rotationRef.current = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 8000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        rotationRef.current.start();
    };

    const formatTime = ms => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const skipToPreviousSong = () => {
        const currentIndex = songs.findIndex(song => song.id === currentSong.id);
        let newIndex;
        
        if (currentIndex <= 0) {
            newIndex = songs.length - 1; // Quay lại bài cuối nếu đang ở bài đầu
        } else {
            newIndex = currentIndex - 1;
        }
        
        handleSongSelect(songs[newIndex]);
    };

    const skipToNextSong = () => {
        const currentIndex = songs.findIndex(song => song.id === currentSong.id);
        let newIndex;
        
        if (currentIndex >= songs.length - 1) {
            newIndex = 0; // Quay lại bài đầu nếu đang ở bài cuối
        } else {
            newIndex = currentIndex + 1;
        }
        
        handleSongSelect(songs[newIndex]);
    };

    // Render Components
    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={goBack}>
                <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Đang phát</Text>
            <View style={{ width: 30 }} />
        </View>
    );

    const renderCoverArt = () => (
        <View style={styles.coverWrapper}>
            <Animated.Image
                source={IMAGES.cdDisk}
                style={[styles.cdDisk, { transform: [{ rotate: spin }] }]}
            />
            <Image source={IMAGES[currentSong.imageKey]} style={styles.coverOnDisk} />
        </View>
    );

    const renderControls = () => (
        <View style={styles.controls}>
            <TouchableOpacity onPress={toggleMode}>
                <MaterialIcons
                    name={mode === PLAY_MODES.REPEAT_ONE ? "repeat-one" :
                        mode === PLAY_MODES.REPEAT_ALL ? "repeat" : "shuffle"}
                    size={28}
                    color="#1DB954"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipToPreviousSong}>
                <Ionicons name="play-skip-back" size={34} color="#bbb" />
            </TouchableOpacity>

            <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipToNextSong}>
                <Ionicons name="play-skip-forward" size={34} color="#bbb" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                <Ionicons name="thumbs-up" size={28} color={isLiked ? "#1DB954" : "#bbb"} />
            </TouchableOpacity>
        </View>
    );

    const renderSongList = () => (
        <View style={styles.songListContainer}>
            <Text style={styles.listTitle}>Danh sách phát</Text>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.songListItem,
                            currentSong.id === item.id && styles.activeSong
                        ]}
                        onPress={() => handleSongSelect(item)}
                    >
                        <Image
                            source={IMAGES[item.imageKey]}
                            style={styles.songThumb}
                        />
                        <View style={styles.songInfo}>
                            <Text
                                style={[
                                    styles.songListTitle,
                                    currentSong.id === item.id && styles.activeText
                                ]}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            <Text style={styles.songListArtist}>{item.artist}</Text>
                        </View>
                        {currentSong.id === item.id && (
                            <Ionicons name="musical-notes" size={20} color="#1DB954" />
                        )}
                    </TouchableOpacity>
                )}
                style={styles.songList}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderCoverArt()}

            <View style={styles.infoBox}>
                <Text style={styles.songTitle}>{currentSong.title}</Text>
                <Text style={styles.artist}>{currentSong.artist}</Text>
            </View>

            <View style={styles.progressBarWrapper}>
                <Slider
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onSlidingComplete={val => soundRef.current.setPositionAsync(val)}
                    minimumTrackTintColor="#1DB954"
                    maximumTrackTintColor="#444"
                    thumbTintColor="#1DB954"
                />
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>{formatTime(position)}</Text>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
            </View>

            {renderControls()}
            {renderSongList()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: 50,
    },
    
    // Header styles
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    backBtn: {
        padding: 10,
    },
    // Cover art section
    coverWrapper: {
        alignItems: "center",
        justifyContent: "center",
        height: 260,
        marginBottom: 25,
    },
    cdDisk: {
        width: 260,
        height: 260,
        borderRadius: 130,
        position: "absolute",
        opacity: 0.6,
    },
    coverOnDisk: {
        width: 150,
        height: 150,
        borderRadius: 75,
        zIndex: 1,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.1)',
    },

    // Song info section
    infoBox: {
        alignItems: "center",
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    songTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        textAlign: 'center',
    },
    artist: {
        fontSize: 16,
        color: "#b3b3b3",
        marginTop: 6,
    },

    // Progress bar section
    progressBarWrapper: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 8,
    },
    timeText: {
        color: "#b3b3b3",
        fontSize: 12,
    },

    // Controls section
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    playBtn: {
        backgroundColor: "#1DB954",
        padding: 16,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },

    // Song list section
    songListContainer: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    listTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
    },
    songList: {
        flex: 1,
    },
    songListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 4,
    },
    activeSong: {
        backgroundColor: '#282828',
    },
    songThumb: {
        width: 40,
        height: 40,
        borderRadius: 6,
        marginRight: 12,
    },
    songInfo: {
        flex: 1,
    },
    songListTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    activeText: {
        color: '#1DB954',
        fontWeight: '600',
    },
    songListArtist: {
        color: '#b3b3b3',
        fontSize: 12,
        marginTop: 4,
    }
});

export default PlayScreen;