import { Outlet } from "react-router";
import Header from "../components/rootlayout/Header";
import Sidebar from "../components/rootlayout/Sidebar";
import { usesidebarToggleStore } from "../stores/sideberToggleStore";
import { twMerge } from "tailwind-merge";

export default function RootLayout() {
  const isToggle = usesidebarToggleStore((state) => state.isToggle);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-screen min-h-screen w-full">
        <Header logo sidebar />
        <div
          className={twMerge(
            "h-full pl-[300px] transition-all",
            !isToggle && "pl-20"
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
