import axios from 'axios';

const createApi = (basePath) => {
  const instance = axios.create({
    baseURL: `http://localhost:8085/api/v1/${basePath}`,
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('token')}` 
    },
    withCredentials:true
  });

  instance.interceptors.request.use(config => {
    const storedAuth = JSON.parse(sessionStorage.getItem('user'));
    const token = storedAuth?.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        sessionStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createApi;

export const authApi = createApi('auth');
export const userApi = createApi('user');