import { useNavigate } from "react-router";
import notifyIcon from "../../assets/notifyIcon.svg";
import { twMerge } from "tailwind-merge";
import logoImg from "../../assets/loge.svg";
import UserProfile from "../UserProfile";
import ButtonComponent from "../ButtonComponent";
import { useAuth } from "../../stores/authStore";
import React, { useEffect } from "react";

// 사이드바 접힐때 로고 보이도록 처리하자
export default function Header({
  logo,
  sidebar,
}: {
  logo?: boolean;
  sidebar?: boolean;
}) {
  const navigate = useNavigate();
  // Todo : 테스트 로그인 변경기능, 로그인 기능 개발 이후 연동후에 삭제해야함
  const [testlogin, settestlogin] = React.useState(false);
  const testloginHandler = () => {
    settestlogin(!testlogin);
  };

  // Todo : 로그인기능 구현 후에 이 값으로 로그인 분기처리
  // const isLoggedin = useAuth().isLoggedIn;
  // Todo : 로그아웃기능 구현
  const logout = () => {};

  return (
    <header
      className={twMerge(
        "h-[70px] flex items-center justify-end py-[20px] ",
        logo ? "justify-between" : "justify-end",
        sidebar ? "pl-[100px] pr-[36px]" : "px-[36px]"
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
      <button
        className="mx-10 items-center justify-center border-solid border"
        onClick={testloginHandler}
      >
        테스트 로그인
      </button>
      {testlogin ? (
        // 로그인 상태 분기
        <div className="flex gap-[10px] items-center">
          <p className="mx-10 items-center justify-center">로그인상태</p>

          <ButtonComponent
            bgcolor="bg-[#265CAC]"
            textcolor="text-[white]"
            // Todo : 로그이웃기능 zustand에서 로그인이 구현하는것 보고 추후 처리
            onClick={() => useAuth().logout()}
          >
            {"로그아웃"}
          </ButtonComponent>
          <ButtonComponent
            bgcolor="bg-white"
            textcolor="text-[#265CAC]"
            // Todo : 글작성 페이지 도메인으로 변경
            onClick={() => navigate("/newPost")}
          >
            {"새글등록"}
          </ButtonComponent>

          {/* {!isLoggedIn && } */}
          {/*  유저 프로필 */}
          {/* <div className="bg-white w-[48px] h-[48px] ml-[10px] flex justify-center items-center rounded-[50%] shadow-profile-inner cursor-pointer">
          <img
            src={defaultUser}
            alt="기본 유저사진"
            className="w-[33px] h-[33px]"
          />
        </div> */}

          <div className="w-[48px] h-[48px]  flex justify-center items-center mx-[10px]">
            <img
              src={notifyIcon}
              alt="알림 아이콘"
              className="cursor-pointer"
              onClick={() => {}}
            />
          </div>

          <UserProfile
            BackWidth="w-[48px]"
            BackHeight="h-[48px]"
            IconWidth="w-[33px]"
            IconHeight="h-[33px]"
            // Todo : 추후 마이페이지 어케 이동하는지 보고 처리
            onClick={() => navigate("/user/login")}
          />
        </div>
      ) : (
        // 비로그인 상태 분기
        <div className="flex gap-[10px] items-center">
          <p className="mx-10 items-center justify-left">비로그인상태</p>
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
        </div>
      )}
    </header>
  );
}
