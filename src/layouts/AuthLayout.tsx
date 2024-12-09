import { Outlet } from "react-router";
import cycle from "../assets/cycle.svg";
import Header from "../components/rootlayout/Header";

export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full h-screen min-h-screen ">
      <Header logo />
      <div className="relative flex h-full border-2 bg-[#EFF3F7]">
        {/* 이미지 백그라운드 */}
        <img
          src={cycle}
          className="absolute bottom-0 left-0 w-[400px] h-[600px] object-contain z-0"
          alt="Cycle"
        />
        {/* 로그인 & 회원가입 컴포넌트 */}
        <div className="rounded-[45px] w-[400px] h-[500px] m-auto bg-white z-10 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
