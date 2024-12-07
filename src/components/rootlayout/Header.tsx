import { useNavigate } from "react-router";
import defaultUser from "../../assets/defaultUser.svg";
import { twMerge } from "tailwind-merge";
import logoImg from "../../assets/loge.svg";

export default function Header({ logo }: { logo?: boolean }) {
  const navigate = useNavigate();

  return (
    <header
      className={twMerge(
        "h-[70px] flex items-center justify-end px-[36px] py-[8px]",
        logo ? "justify-between" : "justify-end"
      )}
    >
      <div>
        <img src={logoImg} alt="logo" className={twMerge(!logo && "hidden")} />
      </div>

      {/* 오른쪽 */}
      <div className="flex gap-[10px] items-center">
        <div
          className="w-[120px] h-[36px] rounded-[10px] bg-[#265CAC]
          text-white flex justify-center 
          items-center cursor-pointer font-bold"
          onClick={() => navigate("/login")}
        >
          로그인
        </div>
        <div
          className="w-[120px] h-[36px] rounded-[10px] bg-white 
        text-[#265CAC] flex justify-center items-center 
          border-solid border border-[#265CAC] cursor-pointer font-bold"
          onClick={() => navigate("/signup")}
        >
          가입하기
        </div>

        {/*  유저 프로필 */}
        <div className="bg-white w-[48px] h-[48px] ml-[10px] flex justify-center items-center rounded-[50%] shadow-profile-inner cursor-pointer">
          <img
            src={defaultUser}
            alt="기본 유저사진"
            className="w-[33px] h-[33px]"
          />
        </div>
      </div>
    </header>
  );
}
