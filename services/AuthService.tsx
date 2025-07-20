import axios from 'axios';

// const API_URL = 'http://10.13.2.126:4000/users'; //đây là địa chỉ IP của FPT  
const API_URL = 'http://192.168.1.2:4000/users'; //đây là địa chỉ IP của Anh Bùi  

// const API_URL = 'http://192.168.56.1:4000/users'; // IP của Phương Anh 

const login = async (username: string, password: string) => {
  try {
    const res = await axios.get(`${API_URL}?username=${username}&password=${password}`);
    console.log('Username: ' +username + 'Password: ' + password);
    const user = res.data[0];
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
    }
  } catch (error: any) {
    console.log('Login error:', error?.response?.data || error.message || error);
    return { success: false, error: 'Lỗi server' };
  }
};
const register = async (user: {
  username: string;
  password: string;
  email?: string;
  phone?: string;
}) => {
  try {
    if (!user.username || !user.password || !user.email || !user.phone) {
      return { success: false, error: 'Vui lòng nhập đầy đủ thông tin' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return { success: false, error: 'Email không hợp lệ' };
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(user.phone)) {
      return { success: false, error: 'Số điện thoại không hợp lệ' };
    }

    if (user.password.length < 6) {
      return { success: false, error: 'Mật khẩu phải có ít nhất 6 ký tự' };
    }

    const check = await axios.get(`${API_URL}?username=${user.username}`);
    if (check.data.length > 0) {
      return { success: false, error: 'Tên đăng nhập đã được sử dụng' };
    }
    const emailCheck = await axios.get(`${API_URL}?email=${user.email}`);
    if(emailCheck.data.length > 0){
      return {success:false,error:'Email đã được sử dụng'}
    }

    const newUser = {
      ...user,
      createdAt: new Date().toISOString(),
    };

    const res = await axios.post(API_URL, newUser);
    return { success: true, user: res.data };
  } catch (error: any) {
    console.log('Register error:', error?.response?.data || error.message || error);
    return { success: false, error: 'Lỗi server' };
  }
};

const getUser = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return { success: true, user: res.data };
  } catch (error: any) {
    console.log('Get user error:', error?.response?.data || error.message || error);
    return { success: false, error: 'Không thể lấy thông tin người dùng' };
  }
};


export default { login, register, getUser };