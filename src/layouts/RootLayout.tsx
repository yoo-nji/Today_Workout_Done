import { Outlet } from "react-router";
import Header from "../components/rootlayout/Header";
import Sidebar from "../components/rootlayout/Sidebar";
import { usesidebarToggleStore } from "../stores/sideberToggleStore";
import { twMerge } from "tailwind-merge";
import scrollUp from "../assets/scrollUp.svg";
import { useLoadingStore } from "../stores/loadingStore";
import { useRef, useState } from "react";

export default function RootLayout() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const isToggle = usesidebarToggleStore((state) => state.isToggle);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      console.warn("Scroll container is not defined.");
    }
  };

  return (
    <div
      className={twMerge(
        "flex font-pretendard",
        isLoading && "overflow-hidden"
      )}
    >
      <Sidebar setIsModalOpen={setIsModalOpen} />
      <div className="flex flex-col w-full h-screen min-h-screen dark:bg-lightBlackDark">
        <Header logo sidebar />
        <div
          ref={scrollContainerRef}
          className={twMerge(
            "h-full pl-[300px] overflow-auto transition-all",
            !isToggle && "pl-20"
          )}
        >
          <Outlet />
        </div>
        {/* 위로 가기 버튼 */}
        <form
          className={`fixed right-[25px] bottom-[10px] z-50 w-[40px] ${
            isModalOpen && "hidden"
          }`}
        >
          <button type="button" onClick={scrollToTop}>
            <img
              src={scrollUp}
              alt="위로 이동"
              className="rounded-full shadow-xl"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
