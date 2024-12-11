import { Await, useNavigate } from "react-router";
import notifyIcon from "../../assets/notifyIcon.svg";
import { twMerge } from "tailwind-merge";
import logoImg from "../../assets/loge.svg";
import UserProfile from "../UserProfile";
import ButtonComponent from "../ButtonComponent";
import { useAuth } from "../../stores/authStore";
import React, { useEffect } from "react";
import { api } from "../../api/axios";
import { AxiosError } from "axios";

// 사이드바 접힐때 로고 보이도록 처리하자
export default function Header({
  logo,
  sidebar,
}: {
  logo?: boolean;
  sidebar?: boolean;
}) {
  const navigate = useNavigate();
  const authInfo = useAuth();
  {
    /* 정식배포시 삭제 */
  }
  // 아래는 테스트용 배포시에 제거
  const login = useAuth((state) => state.login);
  const setUser = useAuth((state) => state.setUser);

  // 테스트버튼입니다 정식배포땐 삭제
  const testhandler = () => {
    console.log(authInfo.user?.fullName);
  };

  // 테스트용 빠른 로그인입니다 귀찮으신분 자기 ID 비번 적어서 사용하세요
  const fastlogin = async () => {
    console.log(111);
    try {
      const { status, data } = await api.post("login", {
        email: "wjw1469@gmail.com",
        password: "asdf1234",
      });
      login(data.token);
      setUser(data.user);
      alert("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        alert("아이디나 비밀번호가 틀립니다.");
      }
    }
  };
  {
    /* 정식배포시 삭제 */
  }
  const isLoggedin = useAuth().isLoggedIn;
  const logout = () => {
    authInfo.logout();
  };

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
      {/* 정식배포시 삭제 */}
      <button
        className="border border-solid border-rose-400 w-[220px] h-[36px] rounded-[10px]"
        onClick={() => testhandler()}
      >
        헤더의 만능 테스트버튼
      </button>
      {/* 정식배포시 여기까지 삭제 */}

      {isLoggedin ? (
        // 로그인 상태 분기
        <div className="flex gap-[10px] items-center">
          <ButtonComponent
            bgcolor="bg-[#265CAC]"
            textcolor="text-[white]"
            onClick={() => {
              logout();
            }}
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
          {/* 정식배포시 삭제 */}
          <button
            className="border border-solid border-rose-400 w-[220px] h-[36px] rounded-[10px]"
            onClick={() => fastlogin()}
          >
            로그인이 귀찮은자를 위해
          </button>
          {/* 정식배포시 여기까지 삭제 */}
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
