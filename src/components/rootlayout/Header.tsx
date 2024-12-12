import { useNavigate } from "react-router";
import notifyIcon from "../../assets/notifyIcon.svg";
import { twMerge } from "tailwind-merge";
import logoImg from "../../assets/loge.svg";
import UserProfile from "../UserProfile";
import ButtonComponent from "../ButtonComponent";
import { useAuth } from "../../stores/authStore";
import React, { useEffect, useState } from "react";
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
    console.log(authInfo.user);
  };

  // 테스트용 빠른 로그인입니다 귀찮으신분 자기 ID 비번 적어서 사용하세요
  const fastlogin = async () => {
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
  const isNotification = authInfo.user?.notifications;
  const logout = () => {
    authInfo.logout();
    // 로컬스토리지 삭제
    useAuth.persist.clearStorage();
  };

  //

  // Todo : 알림창 폼 보여줄지 분기처리
  const [showNoti, setShowNoti] = useState(false);
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
            onClick={() => navigate("/posting")}
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
            {isNotification?.length == 0 && (
              <div className="w-3 h-3 rounded-[50%] bg-red-500 absolute bottom-0 right-0"></div>
            )}

            {/* Todo 알림창 바깥을 눌러도 꺼질수 있도록 방법 알아보자 */}
            {/* Todo API있어야지 이후에 처리 가능할거같음 그전까지 최대한 만들어보자*/}
            {showNoti && (
              <div className="absolute z-10 top-[32px] right-[80px] mt-2 w-[280px]  p-[18px] rounded-[10px] max-h-1">
                {/* 말풍선 꼬리 */}
                {/* Todo 말풍선 꼬리 tailwind로 만드는법 알아보자 */}
                {/* 말풍선 본문 */}
                <div
                  className="w-[350px] bg-white border border-gray-200 rounded-xl shadow-lg p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      알림 내용
                    </h3>

                    {/* 댓글의 앞부분 가져와서 한줄로 보여주고 길이초과시 ...처리  */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        댓글이 달린 나의 글
                      </label>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus, repudiandae saepe quod quam iste laborum rem
                      molestias? Eaque nisi exercitationem quibusdam dolorem
                      eius animi, iusto, ratione, voluptatem laborum a modi?
                    </div>

                    {/* 이부분 디자인하고 퍼블리싱 해야한다 */}

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        새로운 좋아요
                      </label>
                      <div>*개</div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="memo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        새로운 팔로워
                        <div>*명</div>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="memo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        받은 메세지
                        <div>*개</div>
                      </label>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <ButtonComponent
                        bgcolor="bg-[#265CAC]"
                        textcolor="text-[white]"
                        onClick={() => {
                          setShowNoti(false);
                        }}
                      >
                        {"닫기"}
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
