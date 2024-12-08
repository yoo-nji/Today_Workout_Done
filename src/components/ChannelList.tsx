import { NavLink } from "react-router";

interface ChannelListProps {
  children: string;
  icon: string;
  alt: string;
  route: string;
}

export default function ChannelList({
  children,
  icon,
  alt,
  route,
}: ChannelListProps) {
  return (
    <li>
      <NavLink
        to={route}
        className="flex items-center gap-[10px] w-full h-[50px] pl-6 text-xl font-normal rounded-lg bg-[#FEFEFE] hover:bg-[#EAEAEA] transition cursor-pointer"
      >
        <img className="w-8" src={icon} alt={alt} />
        <div>{children}</div>
      </NavLink>

    </li>
  );
}
