import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useAuthStore } from "../../stores/auth";

const http: AxiosInstance = axios.create({});

http.interceptors.request.use((config: AxiosRequestConfig) => {
  const { token } = useAuthStore();
  if (token) {
    config.headers = { ...config.headers, Authorization: `bearer ${token}` };
  }

  return config;
});

http.interceptors.response.use((response: AxiosResponse) => {
  return response;
});

export default http;
