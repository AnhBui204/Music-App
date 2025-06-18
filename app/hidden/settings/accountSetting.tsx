import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
import { user } from "../../../data/mock";

export default function AccountSettings() {
  const navigation = useNavigation();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Account deleted");
            ToastAndroid.show(
              "Account deleted successfully",
              ToastAndroid.SHORT
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Back Arrow Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Account Info</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{user?.name || "N/A"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || "N/A"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Joined date</Text>
          <Text style={styles.value}>{user?.joined || "N/A"}</Text>
        </View>

        <Text style={styles.subHeading}>Your Plan</Text>
        <View style={styles.planCard}>
          <Text style={styles.planName}>{user?.plan || "Free"}</Text>
          <Text style={styles.planDescription}>
            {user?.plan === "Free"
              ? "Basic access to music streaming with ads."
              : user?.plan === "Premium"
              ? "Ad-free listening, offline downloads, and more."
              : "Lifetime access with all premium features forever."}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={styles.deleteWrapper}
        >
          <Text style={styles.deleteText}>
            {"To delete your data permanently, "}
            <Text style={styles.deleteTextUnderline}>
              {"close your account"}
            </Text>
            {"."}
          </Text>
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
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
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
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  infoBox: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 15,
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  planCard: {
    backgroundColor: "#fff5e5",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d2691e",
    marginBottom: 4,
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
});
