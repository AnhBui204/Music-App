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

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (currentPassword !== user.password) {
      Alert.alert("Mật khẩu hiện tại không đúng");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Mật khẩu mới không khớp");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Mật khẩu mới cần ít nhất 6 ký tự");
      return;
    }

    const updated = { ...user, password: newPassword };
    await AuthService.updateUser(updated);
    ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mật khẩu hiện tại</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setCurrentPassword}
      />

      <Text style={styles.label}>Mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

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
