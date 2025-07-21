import AuthService from "@/services/AuthService";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountSettings() {
  const [userData, setUserData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      console.log(" >>>[INFO] User ID in storage:", parsed.id);

      const result = await AuthService.getUser(parsed.id);
      if (result.success) {
        setUserData(result.user);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          ToastAndroid.show("Đã đăng xuất thành công", ToastAndroid.SHORT);
          router.replace("/auth/LoginScreen");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Xóa tài khoản",
      "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            console.log("Account deleted");
            ToastAndroid.show("Tài khoản đã bị xóa", ToastAndroid.SHORT);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt tài khoản</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Thông tin tài khoản</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Tên người dùng</Text>
          <Text style={styles.value}>{userData?.name || "N/A"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userData?.email || "N/A"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Ngày tạo tài khoản</Text>
          <Text style={styles.value}>
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString("vi-VN")
              : "N/A"}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/hidden/setting/changeUsername")}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Đổi tên người dùng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/hidden/setting/changePassword")}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <Text style={styles.subHeading}>Gói của bạn</Text>
        <View style={styles.planCard}>
          <Text style={styles.planName}>{userData?.plan || "Free"}</Text>
          <Text style={styles.planDescription}>
            {userData?.plan === "Free"
              ? "Nghe nhạc cơ bản có quảng cáo."
              : userData?.plan === "Premium"
              ? "Nghe không quảng cáo, tải offline, và nhiều hơn nữa."
              : "Quyền truy cập vĩnh viễn tất cả các tính năng Premium."}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={styles.deleteWrapper}
        >
          <Text style={styles.deleteText}>
            {"Để xóa dữ liệu vĩnh viễn, "}
            <Text style={styles.deleteTextUnderline}>
              {"xóa tài khoản của bạn"}
            </Text>
            {"."}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#000",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 13,
    marginBottom: 13,
    color: "#fff",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    color: "#fff",
  },
  infoBox: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
  },
  label: {
    fontSize: 15,
    color: "#999",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  planCard: {
    backgroundColor: "#fff5e5",
    borderRadius: 12,
    padding: 16,
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d2691e",
    marginBottom: 4,
  },
  actionButton: {
    marginTop: 16,
    backgroundColor: "#1abc9c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  planDescription: {
    fontSize: 14,
    color: "#555",
  },
  deleteWrapper: {
    marginTop: 28,
    alignItems: "center",
  },
  deleteText: {
    fontSize: 14,
    color: "#d9534f",
    textAlign: "center",
  },
  deleteTextUnderline: {
    fontSize: 14,
    color: "#d9534f",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
