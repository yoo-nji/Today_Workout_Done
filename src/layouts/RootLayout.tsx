import { Outlet } from "react-router";
import Header from "../components/rootlayout/Header";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow ">
        <Outlet />
      </div>
    </div>
  );
}
