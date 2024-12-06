import axios from "axios";
import { useAuth } from "../stores/authStore";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

api.interceptors.request.use((config) => {
  const token = useAuth.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// /.env 파일에 아래 코드 삽입
// VITE_API_URL=https://5th.fe.dev-cos.com:5001

//  or

// export const api = axios.create({
//   baseURL: `https://5th.fe.dev-cos.com:5001`,
// });
