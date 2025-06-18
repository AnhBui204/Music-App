import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  TextInput
} from 'react-native-paper';
import AuthService from '../../services/AuthService';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
          textColor='#fff'
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
          textColor='#fff'
        mode="outlined"
        style={styles.input}
       
      />

      <TextInput
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
          textColor='#fff'
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
        textColor='#fff'
      
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
       
      >
        Đã có tài khoản? <Text style={styles.loginLink} onPress={() => router.push('/LoginScreen')}>Đăng nhập</Text>
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
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
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
  loginLink: {
    color: '#2ecc71',
    fontWeight: 'bold',
  }
});
