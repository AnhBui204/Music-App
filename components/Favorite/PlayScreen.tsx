// components/Favorite/PlayScreen.tsx
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
import { useStats } from "./StatsContext"; // Assuming you have a StatsContext for play count

import images from "@/constants/Images";
import { useMusicPlayer } from "./MusicPlayerContext";

const IMAGES = {
    cdDisk: require("../../assets/images/cd_disk.png"),
};

const PLAY_MODES = {
    REPEAT_ONE: "repeatOne",
    REPEAT_ALL: "repeatAll",
    SHUFFLE: "shuffle",
};

type Props = {
    params?: any; // Thêm ? để optional
};

const PlayScreen = ({ params }: Props) => {
    // Xử lý an toàn khi params có thể undefined
    const song = params?.song ? (typeof params.song === 'string' ? JSON.parse(params.song) : params.song) : null;
    const { incrementPlayCount } = useStats() as any;
    
    // Sử dụng MusicPlayerContext
    const { 
        currentSong, 
        isPlaying, 
        songs, 
        playTrack, 
        togglePlay, 
        nextTrack, 
        previousTrack,
        position,
        duration,
        isFavorite,
        toggleFavorite
    } = useMusicPlayer();

    const [mode, setMode] = useState(PLAY_MODES.REPEAT_ONE);
    const spinValue = useRef(new Animated.Value(0)).current;
    const rotationRef = useRef<any>(null);

    useEffect(() => {
        // Logic được cập nhật:
        // - Nếu có song từ params và không có bài nào đang phát -> phát bài từ params
        // - Nếu không có song từ params -> chỉ hiển thị bài đang phát hiện tại (nếu có)
        // - Nếu cả hai đều không có -> hiển thị "Chọn một bài hát để phát"
        if (song && !currentSong) {
            playTrack(song);
        }
        // Không cần làm gì nếu không có song từ params - chỉ hiển thị currentSong hiện tại
    }, [song, currentSong, playTrack]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        if (isPlaying) {
            rotateDisc();
        } else if (rotationRef.current) {
            rotationRef.current.stop();
        }
    }, [isPlaying]);

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

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const toggleMode = () => {
        setMode((prev) => {
            if (prev === PLAY_MODES.REPEAT_ALL) return PLAY_MODES.REPEAT_ONE;
            if (prev === PLAY_MODES.REPEAT_ONE) return PLAY_MODES.SHUFFLE;
            return PLAY_MODES.REPEAT_ALL;
        });
    };

    const handleSongSelect = (selectedSong: any) => {
        playTrack(selectedSong);
        if (incrementPlayCount) {
            incrementPlayCount(selectedSong.title);
        }
    };

    // Nếu không có bài hát hiện tại, hiển thị loading
    if (!currentSong) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.headerTitle}>Chọn một bài hát để phát</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đang phát</Text>
                <View style={{ width: 30 }} />
            </View>

            <View style={styles.coverWrapper}>
                <Animated.Image
                    source={IMAGES.cdDisk}
                    style={[styles.cdDisk, { transform: [{ rotate: spin }] }]}
                />
                <Image source={images[currentSong.image]} style={styles.coverOnDisk} />
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.songTitle}>{currentSong.title}</Text>
                <Text style={styles.artist}>{currentSong.artist}</Text>
            </View>

            <View style={styles.progressBarWrapper}>
                <Slider
                    minimumValue={0}
                    maximumValue={duration || 1}
                    value={position || 0}
                    onSlidingComplete={() => {}} // Tạm thời disable seek
                    minimumTrackTintColor="#1DB954"
                    maximumTrackTintColor="#444"
                    thumbTintColor="#1DB954"
                />
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>{formatTime(position || 0)}</Text>
                    <Text style={styles.timeText}>{formatTime(duration || 0)}</Text>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={toggleMode}>
                    <MaterialIcons
                        name={
                            mode === PLAY_MODES.REPEAT_ONE ? "repeat-one" :
                                mode === PLAY_MODES.REPEAT_ALL ? "repeat" : "shuffle"
                        }
                        size={28}
                        color="#1DB954"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={previousTrack}>
                    <Ionicons name="play-skip-back" size={34} color="#bbb" />
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity onPress={nextTrack}>
                    <Ionicons name="play-skip-forward" size={34} color="#bbb" />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleFavorite}>
                    <FontAwesome
                        name={isFavorite ? "heart" : "heart-o"}
                        size={24}
                        color={isFavorite ? "#1DB954" : "#fff"}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.songListContainer}>
                <Text style={styles.listTitle}>Danh sách phát</Text>
                <FlatList
                    data={songs}
                    keyExtractor={(item, index) => `playlist-${(item as any).id}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.songListItem,
                                currentSong.id === item.id && styles.activeSong
                            ]}
                            onPress={() => handleSongSelect(item)}
                        >
                            <Image
                                source={images[item.image]}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212", paddingTop: 50 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 20 },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
    backBtn: { padding: 10 },
    coverWrapper: { alignItems: "center", justifyContent: "center", height: 260, marginBottom: 25 },
    cdDisk: { width: 260, height: 260, borderRadius: 130, position: "absolute", opacity: 0.6 },
    coverOnDisk: { width: 150, height: 150, borderRadius: 75, zIndex: 1, borderWidth: 4, borderColor: 'rgba(255,255,255,0.1)' },
    infoBox: { alignItems: "center", paddingHorizontal: 40, marginBottom: 20 },
    songTitle: { fontSize: 22, fontWeight: "700", color: "#fff", textAlign: 'center' },
    artist: { fontSize: 16, color: "#b3b3b3", marginTop: 6 },
    progressBarWrapper: { paddingHorizontal: 20, marginBottom: 15 },
    timeRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 8 },
    timeText: { color: "#b3b3b3", fontSize: 12 },
    controls: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 30, marginBottom: 20 },
    playBtn: {
        backgroundColor: "#1DB954",
        padding: 16,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    songListContainer: { flex: 1, backgroundColor: '#1e1e1e', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 20, paddingHorizontal: 20 },
    listTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 15 },
    songList: { flex: 1 },
    songListItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, marginBottom: 4 },
    activeSong: { backgroundColor: '#282828' },
    songThumb: { width: 40, height: 40, borderRadius: 6, marginRight: 12 },
    songInfo: { flex: 1 },
    songListTitle: { color: '#fff', fontSize: 14, fontWeight: '500' },
    activeText: { color: '#1DB954', fontWeight: '600' },
    songListArtist: { color: '#b3b3b3', fontSize: 12, marginTop: 4 }
});

export default PlayScreen;
