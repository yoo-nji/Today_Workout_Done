interface ChannelListProps {
  children: string;
  src: string;
  alt: string;
}

export default function ChannelList({ children, src, alt }: ChannelListProps) {
  return (
    <li className="flex items-center gap-[10px] w-full h-[50px] pl-6 text-xl font-normal rounded-lg bg-[#FEFEFE] hover:bg-[#EAEAEA] transition cursor-pointer">
      <img className="w-8" src={`/src/assets/${src}.svg`} alt={alt} />
      <div>{children}</div>
    </li>
  );
}
