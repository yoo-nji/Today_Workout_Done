import UserProfile from "../UserProfile";

export default function CommentBox() {
  return (
    <div className="flex flex-col gap-3 mt-8 border-2 border-blue-500">
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
      <div>댓글</div>
    </div>
  );
}
