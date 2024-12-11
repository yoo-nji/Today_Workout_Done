import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";
import { useChannelStore } from "../stores/channelStore";

interface ChannelListProps {
  children: string;
  icon: string;
  alt: string;
  route: string;
  toggleStyle?: string;
  isToggleOpen: boolean;
  channel_id: string;
}

export default function ChannelList({
  children,
  icon,
  alt,
  route,
  toggleStyle,
  isToggleOpen,
  channel_id,
}: ChannelListProps) {
  const setChannelId = useChannelStore((state) => state.setChannelId);

  return (
    <NavLink
      id={route}
      to={route}
      onClick={() => {
        setChannelId(channel_id);
        console.log(channel_id);
      }}
    >
      {({ isActive }) => (
        <li
          className={twMerge(
            "w-full border-r-4",
            isActive ? "border-[#265CAC]" : "border-transparent"
          )}
        >
          <div
            className={twMerge(
              `flex items-center gap-[10px] w-full h-[50px] pl-6  text-lg font-normal rounded-lg ${
                isActive ? "bg-[#E8F3FC]" : "bg-[#FEFEFE]"
              } hover:bg-[#EAEAEA] transition cursor-pointer`,
              toggleStyle // 토글 스타일 지정
            )}
          >
            <img className="w-7" src={icon} alt={alt} />
            <div className={twMerge(!isToggleOpen && "hidden")}>{children}</div>
          </div>
        </li>
      )}
    </NavLink>
  );
}
