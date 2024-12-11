import CommentBox from "../components/PostDetail/CommentBox";
import CommentForm from "../components/PostDetail/CommentForm";
import PostInfo from "../components/PostDetail/PostInfo";

export default function PostDetail() {
  return (
    <div className="flex justify-center w-full h-full border-2 border-red-500">
      <div className="w-[766px] border-2 border-blue-500 pt-12">
        {/* 포스트 정보  */}
        <PostInfo />
        {/* 코멘트 폼 */}
        <CommentForm />

        <div className="border border-pink-500">
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
