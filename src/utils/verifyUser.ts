import { api } from "../api/axios";
import { useAuth } from "../stores/authStore";

const setUser = useAuth.getState().setUser;
const login = useAuth.getState().login;

export const verifyUser = async () => {
  const { status, data } = await api.get("/auth-user");
  if (!data) return;
  if (status === 200) {
    setUser(data);
    login();
  }
};
