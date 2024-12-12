import likeIcon from "../../assets/like_icon.svg";
import chatIcon from "../../assets/chat_icon_black.svg";
import ButtonComponent from "../ButtonComponent";

interface CommentFormProps {
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function CommentForm({ setCommentInput }: CommentFormProps) {
  return (
    <div className="">
      {/* 좋아요 이모티콘 댓글 이모티콘 area */}
      <div className="flex gap-4">
        <div className="flex gap-1">
          <button>
            <img src={likeIcon} alt="likeIcon" />
          </button>
          4
        </div>
        <div className="flex gap-1">
          <button>
            <img src={chatIcon} alt="chatIcon" />
          </button>
          4
        </div>
      </div>

      {/* 댓글작성 */}
      <textarea
        className="my-3 h-[100px] px-4 py-3 text-xs border-2 rounded-[6px] w-full resize-none focus:outline-none"
        placeholder="댓글을 작성하세요"
      ></textarea>
      <div className="flex justify-between">
        <p>0/100</p>
        <ButtonComponent bgcolor="bg-[#265CAC]" textcolor="text-[white]">
          {"댓글 작성"}
        </ButtonComponent>
      </div>
    </div>
  );
}
