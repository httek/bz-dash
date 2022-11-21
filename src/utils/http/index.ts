import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useAuthStore } from "../../stores/auth";
import { MessagePlugin as message } from "tdesign-vue-next";

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
    if (response.data.code == 4010 || response.data.code == 4011) {
      const authStore = useAuthStore();
      authStore.reset();
    }

    if (response.data.code == 4011) {
      message.warning(response.data.msg);
      const authStore = useAuthStore();
      authStore.reset();
    }

    return response.data;
  },
  (err: AxiosError) => {}
);

export default http;
