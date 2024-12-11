import likeIcon from "../../assets/like_icon.svg";
import chatIcon from "../../assets/chat_icon_black.svg";
import ButtonComponent from "../ButtonComponent";

export default function CommentForm() {
  return (
    <div className="border-2 border-red-500">
      {/* 좋아요 이모티콘 댓글 이모티콘 area */}
      <div className="flex gap-4 border-2 border-blue-500">
        <div className="flex gap-1">
          <img src={likeIcon} alt="likeIcon" />4
        </div>
        <div className="flex gap-1">
          <img src={chatIcon} alt="chatIcon" />4
        </div>
      </div>

      {/* 댓글작성 */}
      <div className="border-2 border-green-500 my-3 h-[100px] px-4 py-3 text-xs">
        댓글을 작성하세요
      </div>
      <div className="flex justify-between border border-red-500">
        <p>0/100</p>
        <ButtonComponent bgcolor="bg-[#265CAC]" textcolor="text-[white]">
          {"댓글 작성"}
        </ButtonComponent>
      </div>
    </div>
  );
}
