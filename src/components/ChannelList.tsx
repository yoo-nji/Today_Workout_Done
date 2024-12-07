interface ChannelListProps {
  children: string;
  icon: string;
  alt: string;
}

export default function ChannelList({ children, icon, alt }: ChannelListProps) {
  return (
    <li className="flex items-center gap-[10px] w-full h-[50px] pl-6 text-xl font-normal rounded-lg bg-[#FEFEFE] hover:bg-[#EAEAEA] transition cursor-pointer">
      <img className="w-8" src={icon} alt={alt} />
      <div>{children}</div>
    </li>
  );
}
