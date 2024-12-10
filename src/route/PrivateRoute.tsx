import { Outlet } from "react-router";
import { useAuth } from "../stores/authStore";
import { Navigate } from "react-router";

// 로그인이 안되어있으면 로그인 페이지로 이동
// 아직 어느 페이지에 적용할지 미정

export default function PrivateRoute() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
