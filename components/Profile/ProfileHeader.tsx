import { getUserById } from "@/services/AuthService";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileHeader() {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("loggedInUser");
        console.log("[DEBUG] stored:", stored);
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("[DEBUG] Fetching user by id:", parsed.id);
          const freshUser = await getUserById(parsed.id);
          setUser(freshUser);
        }
      } catch (err) {
        console.error("Lỗi khi lấy user từ AsyncStorage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  if (!user) {
    return (
      <Text style={{ color: "#fff", marginTop: 20 }}>
        Không có dữ liệu người dùng
      </Text>
    );
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/nal.png")}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user.name || user.username}</Text>

      <View style={styles.statsContainer}>
        {["playlists", "followers", "following"].map((key) => (
          <View key={key} style={styles.statBox}>
            <Text style={styles.statNumber}>
              {user.stats?.[key]?.toLocaleString?.() ?? 0}
            </Text>
            <Text style={styles.statLabel}>{key}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subInfo}>
        Joined: {user.createdAt?.split("T")[0]} • Plan: {user.plan || "Free"}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <Ionicons
          name="ellipsis-horizontal"
          size={24}
          color="#fff"
          style={styles.moreBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 48,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    color: "#fff",
  },
  followInfo: {
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 16,
  },
  subInfo: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },
  editBtn: {
    backgroundColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: "#fff",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  moreBtn: {
    backgroundColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: "#fff",
    height: 40,
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
    color: "#fff",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#fff",
    padding: 5,
  },
});
