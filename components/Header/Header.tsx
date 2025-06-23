import { user } from "@/data/mock";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import GenreButton from "./GenreButton";

export default function Header() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={() => router.push('/profile')}>
                    <Image source={user.pfp} style={styles.avatar} />
                </TouchableOpacity>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.genreScroll}
                >
                    <GenreButton label="All" active />
                    <GenreButton label="Music" />
                    <GenreButton label="Podcasts" />
                </ScrollView>

                <TouchableOpacity onPress={() => router.push('/search')}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 48,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    genreScroll: {
        flex: 1,
    },
});
