import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// สร้าง axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// สร้าง named function สำหรับเพิ่ม token ใน headers
function addAuthToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage.getItem('token');
  if (token) {
    // ตรวจสอบว่า headers ไม่ใช่ undefined
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}

// ใช้ named function ใน interceptor
axiosInstance.interceptors.request.use(addAuthToken);

// ส่งออก axios instance
export default axiosInstance;
