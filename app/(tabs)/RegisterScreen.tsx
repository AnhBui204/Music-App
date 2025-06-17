import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import AuthService from '../../services/AuthService';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleRegister = async () => {
    if (!username || !email || !password || !phone) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const result = await AuthService.register({ username, email, phone, password });

    if (result.success) {
      Alert.alert('Thành công', 'Đăng ký thành công!');
      router.replace('/LoginScreen');
    } else {
      Alert.alert('Thất bại', result.error || 'Đăng ký thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>

      <TextInput
        label="Tên người dùng"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        contentStyle={{ paddingVertical: 10 }}
      >
        Đăng ký
      </Button>

      <Text
        style={styles.switchText}
        onPress={() => router.push('/LoginScreen')}
      >
        Đã có tài khoản? <Text style={styles.loginLink}>Đăng nhập</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F0FFF0', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#388E3C',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  switchText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  loginLink: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});
