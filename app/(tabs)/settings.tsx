import { ScrollView, StyleSheet } from "react-native";
import SettingsScreen from "../hidden/setting/settings";

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <SettingsScreen />;
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "black",
  },
});
