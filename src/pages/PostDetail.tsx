import CommentBox from "../components/PostDetail/CommentBox";
import CommentForm from "../components/PostDetail/CommentForm";
import PostInfo from "../components/PostDetail/PostInfo";

export default function PostDetail() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-[766px]  pt-12">
        {/* 포스트 정보  */}
        <PostInfo />
        {/* 코멘트 폼 */}
        <CommentForm />

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
