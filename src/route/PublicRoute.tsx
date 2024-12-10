import { Outlet } from "react-router";
import { useAuth } from "../stores/authStore";
import { Navigate } from "react-router";

// 로그인이 되어이있으면 메인페이지로 이동
// 로그인, 회원가입 페이지에 적용
export default function PublicRoute() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}
