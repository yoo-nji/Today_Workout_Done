import { useNavigate } from "react-router";
import notifyIcon from "../../assets/notifyIcon.svg";
import { twMerge } from "tailwind-merge";
import logoImg from "../../assets/loge.svg";
import UserProfile from "../UserProfile";
import ButtonComponent from "../ButtonComponent";
import { useAuth } from "../../stores/authStore";
import { useState } from "react";
import { api } from "../../api/axios";
import { AxiosError } from "axios";
import Notification from "../notification/Notification";
import { useToken } from "../../stores/toeknStore";
import ModeChange from "../button/ModeChange";

// 사이드바 접힐때 로고 보이도록 처리하자
export default function Header({
  logo,
  sidebar,
}: {
  logo?: boolean;
  sidebar?: boolean;
}) {
  const navigate = useNavigate();

  // 토큰 설정
  const setToken = useToken((state) => state.setToken);

  // 로그인상태, 로그인, 로그아웃, 유저정보저장
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const login = useAuth((state) => state.login);
  const logout = useAuth((state) => state.logout);
  const setUser = useAuth((state) => state.setUser);
  const userInfo = useAuth((state) => state.user);
  const notificationArray = userInfo?.notifications;
  // 테스트용 빠른 로그인입니다 귀찮으신분 자기 ID 비번 적어서 사용하세요
  const fastlogin = async () => {
    try {
      const { status, data } = await api.post("login", {
        email: "wjw1469@gmail.com",
        password: "asdf1234",
      });
      setToken(data.token);
      login();
      setUser(data.user);
      alert("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        alert("아이디나 비밀번호가 틀립니다.");
      }
    }
  };

  const fastlogin2 = async () => {
    try {
      const { status, data } = await api.post("login", {
        email: "test1@test.com",
        password: "1234",
      });
      setToken(data.token);
      login();
      setUser(data.user);
      alert("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        alert("아이디나 비밀번호가 틀립니다.");
      }
    }
  };

  const test11 = () => {
    console.log(userInfo?.notifications);
  };

  const logoutHandler = () => {
    // 로그아웃 / 토큰 삭제 / 유저정보 삭제
    logout();
    setToken(null);
    setUser(null);
    // 로컬스토리지 삭제
    useToken.persist.clearStorage();
  };

  // Todo : 알림창 폼 보여줄지 분기처리
  const [showNoti, setShowNoti] = useState(false);
  // 모두읽음 누르면 값 처리해서 뱃지 없애기
  const [isNoti, setIsNoti] = useState(true);

  const setIsNotiHandler = () => {
    setIsNoti(false);
  };
  const showNotiHandler = () => {
    setShowNoti(!showNoti);
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
      {/* <button onClick={() => test11()}>sdfsg</button> 테스트용버튼*/}

      {isLoggedIn ? (
        // 로그인 상태 분기
        <div className="flex gap-[10px] items-center">
          {/* 모드변경 버튼 */}
          <div className="flex justify-center">
            <ModeChange />
          </div>

          <ButtonComponent
            bgcolor="bg-[#265CAC]"
            textcolor="text-[white]"
            onClick={logoutHandler}
          >
            {"로그아웃"}
          </ButtonComponent>
          <ButtonComponent
            bgcolor="bg-white"
            textcolor="text-[#265CAC]"
            onClick={() => navigate("/posting")}
          >
            {"새글등록"}
          </ButtonComponent>
          <div className="w-[48px] h-[48px]  flex justify-center items-center mx-[10px] relative">
            <img
              src={notifyIcon}
              alt="알림 아이콘"
              className="cursor-pointer"
              // 알림창 띄워주는 변수
              onClick={() => {
                showNotiHandler();
              }}
            />
            {/* 알림이 있다면 뱃지색 처리 */}
            {userInfo?.notifications?.length != 0 && isNoti == true && (
              <div className="w-3 h-3 rounded-[50%] bg-red-500 absolute bottom-0 right-0"></div>
            )}
            {/* 알림창 보여줘야한다면 처리 */}
            {showNoti && (
              <Notification
                closeNoti={showNotiHandler}
                isNoti={setIsNotiHandler}
                notificationArray={notificationArray}
              />
            )}
          </div>

          <UserProfile
            BackWidth="w-[48px]"
            BackHeight="h-[48px]"
            // Todo : 추후 마이페이지 어케 이동하는지 보고 처리
            onClick={() => navigate("/myprofile")}
          />
        </div>
      ) : (
        // 비로그인 상태 분기
        <div className="flex gap-[10px] items-center">
          {/* 정식배포시 삭제 */}
          {/* <button
            className="border border-solid border-rose-400 w-[220px] h-[36px] rounded-[10px]"
            onClick={() => fastlogin2()}
          >
            test1로그인
          </button>

          <button
            className="border border-solid border-rose-400 w-[220px] h-[36px] rounded-[10px]"
            onClick={() => fastlogin()}
          >
            로그인이 귀찮은자를 위해
          </button> */}

          {/* 모드변경 버튼 */}
          <div className="flex justify-center">
            <ModeChange />
          </div>

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
