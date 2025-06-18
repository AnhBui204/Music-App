import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search songs or artists..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.result}>Search for: {query}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
    paddingTop: 60,
  },
  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  result: {
    color: "white",
    fontSize: 16,
  },
});
