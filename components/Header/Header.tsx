// components/Header.tsx
import { user } from "@/data/mock";
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
    const route = useRouter()
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity
                    onPress={() => route.push('/profile')}
                >
                    <Image source={user.pfp} style={styles.avatar} />
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <GenreButton label="All" active />
                    <GenreButton label="Music" />
                    <GenreButton label="Podcasts" />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
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
});
