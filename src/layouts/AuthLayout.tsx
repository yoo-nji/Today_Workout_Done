import { Outlet } from "react-router";
import authImg from "../assets/authImg.svg";
import Header from "../components/rootlayout/Header";

export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full h-screen min-h-screen">
      <Header logo />
      <div className="relative h-full border-2 border-red-500">
        <img src={authImg} alt="authImg" className="absolute bottom-0" />
        <div className="mt-[150px] border-2 w-[1269px] h-[730px] border-red-500 ml-[460px] flex justify-between">
          {/* 멘트 */}
          <div className="text-6xl border-2 border-blue-500 w-fit">
            <p>어서와</p>
            <p>나와 함께...</p>
            <p>운동하지 않을래?</p>
          </div>
          {/* 로그인 & 회원가입 컴포넌트 */}
          <div className="border-2 border-green-500 w-[600px] h-[730px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
