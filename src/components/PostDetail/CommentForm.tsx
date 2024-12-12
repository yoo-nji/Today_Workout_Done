import likeIcon from "../../assets/like_icon.svg";
import chatIcon from "../../assets/chat_icon_black.svg";
import ButtonComponent from "../ButtonComponent";

interface CommentFormProps {
  likes: LikeType[];
  comments: CommentType[];
  postId: string | undefined;
  handleCommentSubmit: (comment: string) => Promise<void>;
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  commentinputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

export default function CommentForm({
  likes,
  comments,
  handleCommentSubmit,
  newComment,
  setNewComment,
  commentinputRef,
}: CommentFormProps) {
  return (
    <div className="">
      {/* 좋아요 이모티콘 댓글 이모티콘 area */}
      <div className="flex gap-4">
        <div className="flex gap-1">
          <button>
            <img src={likeIcon} alt="likeIcon" />
          </button>
          {likes.length}
        </div>
        <div className="flex gap-1">
          <button>
            <img src={chatIcon} alt="chatIcon" />
          </button>
          {comments.length}
        </div>
      </div>

      {/* 댓글작성 */}
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          ref={commentinputRef}
          className="my-3 h-[100px] px-4 py-3 text-xs border-2 rounded-[6px] w-full resize-none focus:outline-none"
          placeholder="댓글을 작성하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          maxLength={300} // 최대 글자 수 제한
        ></textarea>
        <div className="flex justify-between">
          <p>{newComment.length}/300</p>
          {newComment.length >= 300 && (
            <div className="text-red-500">300자 이상 입력할 수 없습니다</div>
          )}
          <ButtonComponent
            onClick={() => handleCommentSubmit(newComment)}
            bgcolor="bg-[#265CAC]"
            textcolor="text-[white]"
          >
            {"댓글 작성"}
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
}
