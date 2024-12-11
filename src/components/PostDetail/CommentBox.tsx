import UserProfile from "../UserProfile";
import trashIcon from "../../assets/trash.svg";
export default function CommentBox() {
  return (
    <div className="flex flex-col py-4 ">
      <div className="flex justify-between ">
        <div className="flex w-fit">
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
        <button>
          <img src={trashIcon} alt="trashIcon" />
        </button>
      </div>
      <div className="mt-3">댓글</div>
    </div>
  );
}
