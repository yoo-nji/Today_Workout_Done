import { Outlet } from "react-router";
import Header from "../components/rootlayout/Header";

export default function RootLayout() {
  return (
    <div className="flex flex-col h-screen min-h-screen">
      <Header />
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
}
