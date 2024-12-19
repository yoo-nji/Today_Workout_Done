import { Outlet } from "react-router";
import Header from "../components/rootlayout/Header";
import Sidebar from "../components/rootlayout/Sidebar";
import { usesidebarToggleStore } from "../stores/sideberToggleStore";
import { twMerge } from "tailwind-merge";
import scrollUp from "../assets/scrollUp.svg";
import { useLoadingStore } from "../stores/loadingStore";

export default function RootLayout() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const isToggle = usesidebarToggleStore((state) => state.isToggle);
  return (
    <div
      className={twMerge(
        "flex font-pretendard",
        isLoading && "overflow-hidden"
      )}
    >
      <Sidebar />
      <div className="flex flex-col w-full h-screen min-h-screen dark:bg-lightBlackDark">
        <Header logo sidebar />
        <div
          className={twMerge(
            "h-full pl-[300px] transition-all overflow-auto",
            !isToggle && "pl-20"
          )}
        >
          <Outlet />
          {/* 위로 가기 버튼 */}
          <form className="fixed right-[10px] bottom-[10px] z-50 w-[40px]">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src={scrollUp}
                alt="위로 이동"
                className="rounded-full shadow-xl"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
