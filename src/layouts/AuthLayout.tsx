import { Outlet } from "react-router";
import authImg from "../assets/authImg.svg";
import Header from "../components/rootlayout/Header";

export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full h-screen min-h-screen ">
      <Header logo />
      <div className="relative flex h-full border-2 bg-[#EFF3F7]">
        {/* 이미지 백그라운드 */}
        {/* 로그인 & 회원가입 컴포넌트 */}
        <div className=" rounded-[45px] w-[600px] h-[730px] m-auto bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
