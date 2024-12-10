import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

interface ChannelListProps {
  children: string;
  icon: string;
  alt: string;
  route: string;
  toggleStyle?: string;
  isToggleOpen: boolean;
}

export default function ChannelList({
  children,
  icon,
  alt,
  route,
  toggleStyle,
  isToggleOpen,
}: ChannelListProps) {
  return (
    <NavLink id={route} to={route}>
      {({ isActive }) => (
        <li
          className={twMerge(
            "w-full border-r-4",
            isActive ? "border-[#3B6CB4]" : "border-transparent"
          )}
        >
          <div
            className={twMerge(
              "flex items-center gap-[10px] w-full h-[50px] pl-6 text-xl font-normal rounded-lg bg-[#FEFEFE] hover:bg-[#EAEAEA] transition cursor-pointer",
              toggleStyle // 토글 스타일 지정
            )}
          >
            <img className="w-8" src={icon} alt={alt} />
            <div className={twMerge(!isToggleOpen && "hidden")}>{children}</div>
          </div>
        </li>
      )}
    </NavLink>
  );
}
