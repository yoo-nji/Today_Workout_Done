import { useEffect, useState } from "react";
import ChannelList from "../ChannelList";
import UserListModal from "../userlistModal/UserListModal";
import UserProfile from "../UserProfile";
import { twMerge } from "tailwind-merge";
import { usesidebarToggleStore } from "../../stores/sideberToggleStore";
// 아이콘
import dumbbell from "../../assets/dumbbell_icon.svg";
import protein from "../../assets/protein_icon.svg";
import routine from "../../assets/routine_icon.svg";
import gym from "../../assets/gym_icon.svg";
import left from "../../assets/double-left.svg";
import right from "../../assets/double-right.svg";
import user from "../../assets/user_icon.svg";
import ModeChange from "../button/ModeChange";

export default function Sidebar() {
  // 유저 목록 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  // 사이드바 토글 상태
  const isToggle = usesidebarToggleStore((state) => state.isToggle);
  const sidebarToggle = usesidebarToggleStore((state) => state.sidebarToggle);

  const handleToggleClick = () => {
    sidebarToggle();
  };

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const channel = [
    {
      id: 1,
      title: "오운완 인증",
      icon: dumbbell,
      alt: "오운완 아이콘",
      route: "/",
    },
    {
      id: 2,
      title: "프로틴 추천",
      icon: protein,
      alt: "프로틴 아이콘",
      route: "protein",
    },
    {
      id: 3,
      title: "루틴 공유",
      icon: routine,
      alt: "루틴 아이콘",
      route: "routine",
    },
    {
      id: 4,
      title: "헬스장 후기",
      icon: gym,
      alt: "헬스장 아이콘",
      route: "gymreview",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 금지
    } else {
      document.body.style.overflow = ""; // 원래 상태 복원
    }
    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 복원
    };
  }, [isOpen]);

  return (
    <div
      className={twMerge(
        `flex flex-col items-center  h-[100vh] z-10
      py-5 gap-8 text-[#1D1D1D] bg-[#FEFEFE] border-r
      border-gray-200/50 fixed transition-all `,
        isOpen ? "before:modal-back" : "",
        isToggle ? "w-[300px]" : "w-20"
      )}
      onClick={(e) => handleBackClick(e)}
    >
      {/* 토글 버튼 */}
      <button
        onClick={handleToggleClick}
        className={twMerge(
          "self-end w-10 mr-2 hover:brightness-95 transition-all",
          !isToggle && "m-auto"
        )}
      >
        <img src={isToggle ? left : right} alt="" />
      </button>
      {/* 로고 */}
      <a className={twMerge("w-20 h-[53px]", !isToggle && "hidden")} href="/">
        <img src="/src/assets/loge.svg" alt="loge" />
      </a>
      {/* 멘트 */}
      <div className="flex flex-col items-center gap-[14px] pb-[23px] w-full">
        <div
          className={twMerge(
            "flex flex-col items-center text-xl font-bold text-center",
            !isToggle && "hidden"
          )}
        >
          <div>
            어서오세요{" "}
            <span className="text-[#265CAC] text-[26px] font-extrabold">
              수영
            </span>
            님
          </div>
          <div>오늘도 운동 완료하셨나요?</div>
        </div>
        {/* 유저 프로필 */}
        {isToggle && (
          <UserProfile
            edit
            BackWidth="w-[122px]"
            BackHeight="h-[122px]"
            IconWidth="w-[84px]"
            IconHeight="h-[84px]"
          />
        )}
      </div>

      <div className="flex flex-col justify-between w-full h-full">
        {/* 채널목록 */}
        <div className="w-full">
          <ul className="flex flex-col w-full gap-1">
            {channel.map((item) => {
              return (
                <ChannelList
                  icon={item.icon}
                  alt={item.alt}
                  route={item.route}
                  key={item.id}
                  toggleStyle={isToggle ? "" : "p-0 justify-center"}
                  isToggleOpen={isToggle}
                >
                  {item.title}
                </ChannelList>
              );
            })}
          </ul>
        </div>
        <div className=" items-center ">
          {/* 모드변경 버튼 */}
          <div className="flex justify-center">
            <ModeChange />
          </div>
          {/* 유저목록 버튼 */}
          <div className="flex justify-center">
            <button
              className={twMerge(
                "mt-6 self-center w-[243px] h-[50px] bg-[#265CAC] rounded-[20px] text-lg text-white font-bold relative",
                !isToggle && "hidden"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
            >
              유저 목록
            </button>
            <button className={twMerge("mt-6", isToggle && "hidden")}>
              <img
                src={user}
                alt="유저아이콘"
                className={twMerge("self-center m-auto")}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
              />
            </button>
          </div>
        </div>

        {isOpen && (
          <UserListModal
            handleBackClick={handleBackClick}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
}
