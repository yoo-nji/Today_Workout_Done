import UserProfile from "../UserProfile";

export default function PostInfo() {
  return (
    <>
      <div className="mb-2 text-sm">게시판이름</div>
      <h1 className="mb-8 text-4xl">제목</h1>
      <div className="flex gap-[10px] border-blue-500 border-2 items-center">
        <UserProfile
          BackWidth="w-[36px]"
          BackHeight="h-[36px]"
          IconWidth="w-[25px]"
          IconHeight="h-[25px]"
        />
        <div>
          <p className="text-[13px] mb-[6px] font-bold">강수영</p>
          <p className="text-xs">2024.12.10</p>
        </div>
      </div>
      <div className="my-[30px] border border-green-500 flex flex-col items-center">
        <div className="border-2 border-red-500">
          <img
            src="https://image.ajunews.com/content/image/2024/01/21/20240121132054894779.jpg"
            alt=""
          />
        </div>
        <div className="w-full">안녕하세요 저는 코난 입니다</div>
      </div>
    </>
  );
}
