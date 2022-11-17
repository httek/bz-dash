import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useAuthStore } from "../../stores/auth";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 3000,
});

http.interceptors.request.use((config: AxiosRequestConfig) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${authStore.token}`,
    };
  }

  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response.data.code);

    if (response.data.code == 4010) {
      const authStore = useAuthStore();
      authStore.reset();
      console.log("reset auth store");
    }

    return response.data;
  },
  (err: AxiosError) => {}
);

export default http;
