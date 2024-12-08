import { Outlet } from "react-router";
import authImg from "../assets/authImg.svg";
import Header from "../components/rootlayout/Header";

export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full h-screen min-h-screen ">
      <Header logo />
      <div className="relative flex h-full border-2 border-red-500">
        {/* 이미지 백그라운드 */}
        <img
          src={authImg}
          alt="authImg"
          className="absolute bottom-0 h-[85%]"
        />
        {/* 가운데 폼 */}
        <div className="flex self-center justify-between border-2 border-red-500 min-h-[72%] w-[64%] ml-[23%]">
          {/* 멘트 */}
          <div className="text-6xl border-2 border-blue-500">
            <p>어서와</p>
            <p>나와 함께...</p>
            <p>운동하지 않을래?</p>
          </div>
          {/* 로그인 & 회원가입 컴포넌트 */}
          <div className="border-2 border-green-500 w-[47%]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
