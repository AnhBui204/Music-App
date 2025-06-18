import { View, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
}

export default function SettingItem({ label }: Props) {
  return (
    <View style={styles.item}>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
