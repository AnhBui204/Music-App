// file: components/PlayScreen.tsx
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
    Animated, Easing,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


// đưa ảnh cover1.png vào
const images = {
    cover: require("../../assets/images/cover1.png"),
};


const PlayScreen = ({ song, goBack }) => {
    if (!song) return null;


    // const PlayScreen = () => {
    //     const song = {
    //         title: "Music Name",
    //         artist: "Music Artist",
    //         imageKey: "cover",
    //         audioUrl: "music.mp3",
    //     };



    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [modeVisible, setModeVisible] = useState(false);
    const [mode, setMode] = useState("repeatOne");
    const soundRef = useRef(null);

    useEffect(() => {
        loadAudio();
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);



    const loadAudio = async () => {
        const { sound, status } = await Audio.Sound.createAsync(
            require("../../assets/music.mp3"),
            { shouldPlay: true }, // ✅ Tự động play sau khi load
            onPlaybackStatusUpdate
        );
        soundRef.current = sound;
        setDuration(status.durationMillis);
        setIsPlaying(true); // ✅ Bắt đầu xoay đĩa CD + cập nhật UI
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

    const [isLiked, setIsLiked] = useState(false);


    const handleTrackEnd = async () => {
        switch (mode) {
            case "repeatOne":
                await soundRef.current.setPositionAsync(0);
                await soundRef.current.playAsync();
                break;
            case "repeatAll":
                // Add logic to move to next song
                break;
            case "shuffle":
                // Add logic to play random song
                break;
        }
    };

    const toggleMode = () => {
        setMode((prev) => {
            if (prev === "repeatAll") return "repeatOne";
            if (prev === "repeatOne") return "shuffle";
            return "repeatAll";
        });
    };

    const spinValue = useRef(new Animated.Value(0)).current;

    const rotationRef = useRef(null);

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

    useEffect(() => {
        if (isPlaying) {
            rotateDisc();
        } else {
            if (rotationRef.current) {
                rotationRef.current.stop();
            }
        }
    }, [isPlaying]);


    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });




    const formatTime = ms => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={goBack}>
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Đang phát</Text>
                <View style={{ width: 30 }} />
            </View>

            <View style={styles.coverWrapper}>
                <Animated.Image
                    source={require("../../assets/images/cd_disk.png")}
                    style={[styles.cdDisk, { transform: [{ rotate: spin }] }]}
                />
                <Image
                    source={images[song.imageKey]}
                    style={styles.coverOnDisk}
                />
            </View>


            <View style={styles.infoBox}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.artist}>{song.artist}</Text>
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

            <View style={styles.controls}>
                <TouchableOpacity onPress={toggleMode}>
                    {mode === "repeatAll" && (
                        <Feather name="repeat" size={28} color="#1DB954" />
                    )}
                    {mode === "repeatOne" && (
                        <MaterialIcons name="repeat-one" size={28} color="#1DB954" />
                    )}
                    {mode === "shuffle" && (
                        <MaterialIcons name="shuffle" size={28} color="#1DB954" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="play-skip-back" size={34} color="#bbb" />
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="play-skip-forward" size={34} color="#bbb" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                    <Ionicons
                        name="thumbs-up"
                        size={28}
                        color={isLiked ? "#1DB954" : "#bbb"}
                    />
                </TouchableOpacity>

            </View>


        </View>
    );
};

export default PlayScreen;

const styles = StyleSheet.create({
    cdDisk: {
        width: 340,
        height: 340,
        borderRadius: 170,
        position: "absolute",
        opacity: 0.6,
    },
    coverOnDisk: {
        width: 190,
        height: 190,
        borderRadius: 100,
        zIndex: 1,
    },

    coverWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 40,
        height: 340,
    },

    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backBtn: {
        padding: 8,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    cover: {
        width: 300,
        height: 300,
        borderRadius: 20,
    },
    infoBox: {
        alignItems: "center",
        marginVertical: 20,
    },
    songTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    artist: {
        fontSize: 18,
        color: "#ccc",
        marginTop: 6,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
        paddingHorizontal: 10,
    },
    playBtn: {
        backgroundColor: "#1DB954",
        padding: 18,
        borderRadius: 50,
    },
    progressBarWrapper: {
        marginTop: 10,
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    timeText: {
        color: "#ccc",
        fontSize: 12,
    },
    modeSelector: {
        marginTop: 20,
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
        padding: 10,
    },
    modeText: {
        color: "#bbb",
        paddingVertical: 6,
    },
    activeMode: {
        color: "#1DB954",
        fontWeight: "bold",
    },
});
