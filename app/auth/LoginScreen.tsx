import AsyncStorage from '@react-native-async-storage/async-storage';
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
      await AsyncStorage.setItem('user', JSON.stringify(result.user));

      Alert.alert('Thành công', 'Đăng nhập thành công!');
      router.replace('../../components/HomePage/HomePage');
    } else {
      Alert.alert('Thất bại', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        label={<Text style={{ color: '#fff' }}>Tên người dùng</Text>}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        textColor='#fff'
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label={<Text style={{ color: '#fff' }}>Mật khẩu</Text>}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textColor='#fff'
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

      <Text style={styles.switchText} >
        Chưa có tài khoản?
        <Text style={styles.registerLink} onPress={() => router.push('./RegisterScreen')}> Đăng kí</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 20,
    justifyContent: 'center',
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
    backgroundColor: '#23262F',
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#181A20',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  switchText: {
    marginTop: 25,
    textAlign: 'center',
    color: '#2ecc71',
    fontWeight: '600',
  },
  registerLink: {
    color: '#2ecc71',
    fontWeight: 'bold'
  }
});