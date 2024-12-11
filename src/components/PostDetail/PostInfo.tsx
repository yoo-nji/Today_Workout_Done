import UserProfile from "../UserProfile";

interface PostInfoProps {
  title: string;
  desc: string;
  createdAt: string;
  image: string;
  fullName: string;
}

export default function PostInfo({
  title,
  desc,
  createdAt,
  image,
  fullName,
}: PostInfoProps) {
  // Date 객체로 변환
  const date = new Date(createdAt);
  // 원하는 포맷으로 변환
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  return (
    <>
      <div className="mb-2 text-sm">
        게시판이름 (넣을려고했는데 어떻게 처리할지고 고민중)
      </div>
      <h1 className="mb-8 text-4xl">{title}</h1>
      <div className="flex gap-[10px] items-center">
        <UserProfile
          BackWidth="w-[36px]"
          BackHeight="h-[36px]"
          IconWidth="w-[25px]"
          IconHeight="h-[25px]"
        />
        <div>
          <p className="text-[13px] mb-[6px] font-bold">{fullName}</p>
          <p className="text-xs">{formattedDate}</p>
        </div>
      </div>
      <div className="my-[30px] flex flex-col items-center">
        <div className="">
          <img src={image} alt="업로드이미지" />
        </div>
        <div className="w-full">{desc}</div>
      </div>
    </>
  );
}
