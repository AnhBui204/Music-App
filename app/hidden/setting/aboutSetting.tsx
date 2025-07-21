import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DataSavingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {/* Back Arrow Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Về chúng tôi</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Music app</Text>
      </View>
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
    borderBottomColor: "#333", // tối hơn cho dark mode
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
