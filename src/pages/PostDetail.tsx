import CommentBox from "../components/PostDetail/CommentBox";
import CommentForm from "../components/PostDetail/CommentForm";
import PostInfo from "../components/PostDetail/PostInfo";
import leftIcon from "../assets/double-left.svg";
import rightIcon from "../assets/double-right.svg";

export default function PostDetail() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-[766px] py-12 h-fit">
        {/* 포스트 정보  */}
        <PostInfo />
        <div className="flex justify-between">
          <div className="w-[360px] border-2 -[64px] flex items-center gap-4 rounded-[8px]">
            <img src={leftIcon} alt="leftIcon" />
            <span>이전 포스트</span>
          </div>
          <div className="w-[360px] border-2 h-[64px] flex items-center gap-4 justify-end rounded-[8px]">
            <span>다음 포스트</span>
            <img src={rightIcon} alt="leftIcon" />
          </div>
        </div>

        {/* 코멘트 폼 */}
        <div className="mt-4">
          <CommentForm />
        </div>

        <div className="">
          {/* 댓글 박스 */}
          <CommentBox />
          <CommentBox />
          <CommentBox />
          <CommentBox />
          <CommentBox />
        </div>
      </div>
    </div>
  );
}
