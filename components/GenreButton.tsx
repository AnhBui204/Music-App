import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function GenreButton({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.button, active && styles.activeButton]}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#2A2A2A",
    borderRadius: 24,
    marginRight: 8,
  },
  text: {
    color: "#FFF",
    fontWeight: "500",
  },
  activeButton: {
    backgroundColor: "#030303",
  },
  activeText: {
    color: "#FFF",
  },
});
