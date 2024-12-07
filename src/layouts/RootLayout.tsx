import { Outlet } from "react-router";
import Header from "../components/rootlayout/Header";
import Sidebar from "../components/rootlayout/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-screen min-h-screen w-full">
        <Header />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
