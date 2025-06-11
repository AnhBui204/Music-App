import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import AuthService from '../../services/AuthService';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const redirectUri = 'https://auth.expo.io/@khanhluan12/music-app';

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '777125435386-uvjni5ip7pd8ku0mrijfikbl5bcr7eu1.apps.googleusercontent.com',
    redirectUri,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchGoogleProfile(authentication?.accessToken);
    } else if (response?.type === 'error') {
      console.log('Google auth error:', response.error);
      Alert.alert('Đăng nhập thất bại', 'Không thể xác thực với Google');
    }
  }, [response]);

  const fetchGoogleProfile = async (token: string | undefined) => {
    if (!token) return;
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userInfo = await res.json();
      Alert.alert('Đăng nhập Google thành công', `Xin chào ${userInfo.name}`);
      setTimeout(() => {
        router.replace('/HomeScreen');
      }, 500);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng Google');
    }
  };

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
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Hoặc</Text>

    <TouchableOpacity
  style={styles.googleButton}
  onPress={() => promptAsync()}
  disabled={!request}
>
  <Image
    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' }}
    style={{ width: 20, height: 20, marginRight: 10 }}
  />
  <Text style={styles.googleButtonText}>Đăng nhập bằng Google</Text>
</TouchableOpacity>


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
    color: '#2ecc71', // Xanh lá
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 8,
    marginBottom: 15,
    padding: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#95a5a6',
  },
 googleButton: {
  backgroundColor: '#ffffff',
  borderColor: '#ddd',
  borderWidth: 1,
  padding: 14,
  borderRadius: 8,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
googleButtonText: {
  color: '#000',
  fontSize: 16,
  fontWeight: '500',
},

  switchText: {
    marginTop: 25,
    textAlign: 'center',
    color: '#2ecc71',
    fontWeight: '600',
  },
});
