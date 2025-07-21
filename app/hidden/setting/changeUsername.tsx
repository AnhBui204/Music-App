import AuthService from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChangeUsername() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      const result = await AuthService.getUser(parsed.id);
      if (result.success) setUser(result.user);
    };
    fetchUser();
  }, []);

  const handleChange = async () => {
    if (!newUsername) {
      Alert.alert("Vui lòng nhập đủ thông tin");
      return;
    }

    const updated = { ...user, username: newUsername };
    await AuthService.updateUser(updated);
    ToastAndroid.show("Đổi tên thành công", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên người dùng mới</Text>
      <TextInput style={styles.input} onChangeText={setNewUsername} />

      <TouchableOpacity onPress={handleChange} style={styles.button}>
        <Text style={styles.buttonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#000" },
  label: { color: "#fff", fontWeight: "bold", marginTop: 16 },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold", color: "#000" },
});
