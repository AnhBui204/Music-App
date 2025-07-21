import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SettingItem = {
  id: string;
  label: string;
  route: `/hidden/setting/${string}`;
};

const settings: SettingItem[] = [
  { id: "1", label: "Tài khoản", route: "/hidden/setting/accountSetting" },
  {
    id: "2",
    label: "Tiết kiệm dữ liệu và ngoại tuyến",
    route: "/hidden/setting/dataSavingSetting",
  },
  { id: "3", label: "Phát lại", route: "/hidden/setting/playbackSetting" },
  { id: "4", label: "Chất lượng âm thanh", route: "/hidden/setting/qualitySetting" },
  { id: "5", label: "Về chúng tôi", route: "/hidden/setting/aboutSetting" },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Settings List */}
      {settings.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            router.push(item.route);
          }}
          style={styles.itemRow}
        >
          <Text style={styles.itemText}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "black", // Đã là màu đen
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // đổi từ #000 sang trắng
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "white", // đổi từ #000
  },
  profileLink: {
    color: "#aaa",
    fontSize: 14,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#333", // đổi từ #000 để phân cách nhẹ nhàng hơn
  },
  itemText: {
    fontSize: 16,
    color: "white", // đổi từ #000
  },
});
