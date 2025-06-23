import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type SettingItem = {
  id: string;
  label: string;
  route: `/hidden/settings/${string}`;
};

const settings: SettingItem[] = [
  { id: "1", label: "Account", route: "/hidden/settings/accountSetting" },
  {
    id: "2",
    label: "Data-saving and offline",
    route: "/hidden/settings/dataSavingSetting",
  },
  { id: "3", label: "Playback", route: "/hidden/settings/playbackSetting" },
  { id: "4", label: "Media quality", route: "/hidden/settings/qualitySetting" },
  { id: "5", label: "About", route: "/hidden/settings/aboutSetting" },
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
        <Text style={styles.headerTitle}>Settings</Text>
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
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 16,
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
    color: "#000",
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
    color: "#000",
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
    borderBottomColor: "#000",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
});