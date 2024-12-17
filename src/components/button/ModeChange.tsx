import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { usesidebarToggleStore } from "../../stores/sideberToggleStore";
import horizontalAfternoon from "../../assets/horizontalAfternoon.svg";
import horizontalNight from "../../assets/horizontalNight.svg";
import verticalAfternoon from "../../assets/verticalAfternoon.svg";
import verticalNight from "../../assets/verticalNight.svg";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import DeleteConfirm from "../modal/ConfirmModal";
import innercircle from "../../assets/innercircle.svg";
import { useDarkModeStore } from "../../stores/darkModeStore";

export default function ModeChange() {
  const [isClicked, setIsClicked] = useState(false);
  const isToggle = usesidebarToggleStore((state) => state.isToggle);

  // 다크모드
  const isDark = useDarkModeStore((state) => state.isDark);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  // /* 삭제 모달 테스트용 코드 */
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleClick = () => {
  //   // 모달 열기
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   // 모달 닫기
  //   setIsModalOpen(false);
  // };

  // const handleModeChange = () => {
  //   // 실제 모드 변경 로직
  //   setIsClicked((click) => !click);
  //   setIsModalOpen(false);
  // };
  // /* 테스트용 코드 여기까지 */

  const handleClick = () => {
    // setIsClicked((click) => !click);
    toggleDarkMode();
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex items-center justify-center">
      {/* 다크모드 버튼 */}
      <button
        onClick={handleClick}
        className={twMerge(
          "relative w-[63px] h-[30px] rounded-full text-white font-bold text-[16px] overflow-hidden group shadow-inner"
        )}
        style={{
          backgroundImage: isDark
            ? `url(${horizontalNight})`
            : `url(${horizontalAfternoon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={isDark ? moon : sun}
          alt="circleHorizontal"
          className={twMerge(
            `absolute w-[18px] h-[18x] rounded-full transition-all duration-300 ease-in-out translate-y-[5.5px] ${
              isDark ? "translate-x-[8px]" : "translate-x-[34px]"
            } mt-[-15px] top-[50%] group-hover:scale-110`
          )}
        />
        <img
          src={innercircle}
          alt="innercircle"
          className={twMerge(
            `absolute w-[25px] h-[25x] rounded-full transition-all duration-300 ease-in-out translate-y-[3.3px] ${
              isDark ? "translate-x-[36px]" : "translate-x-[2px]"
            } mt-[-15px] top-[50%]`
          )}
        />
      </button>

      {/* 테스트용 DeleteConfirm 모달 */}
      {/* {isModalOpen && (
        <DeleteConfirm
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModeChange}
          message="이 게시글을 정말 삭제하시겠습니까?"
        />
      )} */}
    </div>
  );
}
