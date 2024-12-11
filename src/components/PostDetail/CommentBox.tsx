import UserProfile from "../UserProfile";
import trashIcon from "../../assets/trash.svg";
export default function CommentBox() {
  return (
    <div className="flex flex-col py-5 border-b border-gray-200">
      <div className="flex justify-between ">
        <div className="flex gap-[12px] w-fit items-center">
          <UserProfile
            BackWidth="w-[36px]"
            BackHeight="h-[36px]"
            IconWidth="w-[25px]"
            IconHeight="h-[25px]"
          />
          <div>
            <p className="text-[15px] mb-[2px] font-bold">강수영</p>
            <p className="text-xs font-light">2024.12.10</p>
          </div>
        </div>
        <button className="w-8 mr-2">
          <img src={trashIcon} alt="trashIcon" />
        </button>
      </div>
      <div className="mt-3 text-[14px]">댓글 감사합니다</div>
    </div>
  );
}
