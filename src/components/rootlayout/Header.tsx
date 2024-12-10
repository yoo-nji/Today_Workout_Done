import { useNavigate } from "react-router";
import notifyIcon from "../../assets/notifyIcon.svg";
import { twMerge } from "tailwind-merge";
import logoImg from "../../assets/loge.svg";
import UserProfile from "../UserProfile";
import ButtonComponent from "../ButtonComponent";

export default function Header({ logo }: { logo?: boolean }) {
  const navigate = useNavigate();

  return (
    <header
      className={twMerge(
        "h-[70px] flex items-center justify-end px-[36px] py-[8px] ",
        logo ? "justify-between" : "justify-end"
      )}
    >
      <div>
        <img
          src={logoImg}
          alt="logo"
          className={twMerge("cursor-pointer", !logo && "hidden")}
          onClick={() => navigate("/")}
        />
      </div>

      {/* 오른쪽 */}

      <div className="flex gap-[10px] items-center">
        <ButtonComponent
          bgcolor="bg-[#265CAC]"
          textcolor="text-white"
          onClick={() => navigate("/login")}
        >
          {"로그인"}
        </ButtonComponent>
        <ButtonComponent
          bgcolor="bg-white"
          textcolor="text-[#265CAC]"
          onClick={() => navigate("/signup")}
        >
          {"가입하기"}
        </ButtonComponent>

        {/*  유저 프로필 */}
        {/* <div className="bg-white w-[48px] h-[48px] ml-[10px] flex justify-center items-center rounded-[50%] shadow-profile-inner cursor-pointer">
          <img
            src={defaultUser}
            alt="기본 유저사진"
            className="w-[33px] h-[33px]"
          />
        </div> */}
        <div className="w-[48px] h-[48px]  flex justify-center items-center mx-[10px]">
          <img src={notifyIcon} alt="알림 아이콘" className="cursor-pointer" />
        </div>

        <UserProfile
          BackWidth="w-[48px]"
          BackHeight="h-[48px]"
          IconWidth="w-[33px]"
          IconHeight="h-[33px]"
        />
      </div>
    </header>
  );
}
