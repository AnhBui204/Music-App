import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  TextInput
} from 'react-native-paper';
import AuthService from '../../services/AuthService';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const result = await AuthService.login(username, password);
    if (result.success) {
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      router.replace('/HomeScreen');
    } else {
      Alert.alert('Thất bại', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        label="Tên người dùng"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
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
        onPress={handleLogin}
        style={styles.loginButton}
        contentStyle={{ paddingVertical: 8 }}
      >
        Đăng nhập
      </Button>

      <Text style={styles.switchText} onPress={() => router.push('/RegisterScreen')}>
        Chưa có tài khoản? Đăng ký
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
  },
  switchText: {
    marginTop: 25,
    textAlign: 'center',
    color: '#2ecc71',
    fontWeight: '600',
  },
});
