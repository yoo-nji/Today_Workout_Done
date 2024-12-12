import { useEffect, useRef, useState } from "react";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";
import { Comment, getPostDetail } from "../../utils/getPostDetail";
import { delCommentFn, newCommentFn } from "../../utils/commentFn";

export default function CommentSec({
  likes,
  comments,
  //포스트 아이디
  postId,
}: {
  likes: LikeType[];
  comments: CommentType[];
  postId: string;
}) {
  //댓글 목록
  const [commentList, setCommentList] = useState<Comment[]>([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 에러 상태
  const [error, setError] = useState(false);
  //등록할 댓글
  const [newComment, setNewComment] = useState<string>("");
  // 댓글 인풋
  const commentinputRef = useRef<HTMLTextAreaElement | null>(null);

  //댓글 목록 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        //포스트 아이디
        const postDetail = await getPostDetail(`/posts/${postId}`);
        setCommentList(postDetail?.comments || []); // 댓글 목록 상태 업데이트
      } catch (error) {
        console.log(`댓글 불러오기 실패: ${error}`);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, []);

  //댓글 등록하기
  const handleCommentSubmit = async (comment: string) => {
    const option = {
      comment,
      postId,
    };

    try {
      const newComment = await newCommentFn(option);
      // console.log(newComment);
      setCommentList((commentList) => [...commentList, newComment]);
      setNewComment(""); //인풋 비우기
      commentinputRef.current?.focus();
    } catch (err) {
      console.log(err);
    }
  };

  //내가 작성한 댓글 삭제
  const handleDelete = async (commentId: string) => {
    // 삭제할 id
    // console.log(commentId);
    try {
      await delCommentFn(commentId);
      // 상태 업데이트
      setCommentList((commentList) =>
        commentList.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 응답 상태
  if (isLoading) return <p>댓글 불러오는 중...</p>;
  if (error) return <p>댓글을 불러오는데 실패했습니다.</p>;

  //[ ] 디자인추가
  if (commentList.length === 0)
    return <p>아직 댓글이 없습니다! 댓글을 작성해 주세요</p>;

  return (
    <>
      {/* 코멘트 폼 */}
      <div className="mt-4">
        <CommentForm
          likes={likes}
          comments={comments}
          postId={postId}
          handleCommentSubmit={handleCommentSubmit}
          newComment={newComment}
          setNewComment={setNewComment}
          commentinputRef={commentinputRef}
        />
      </div>
      <div className="">
        {/* 댓글 박스 */}
        {commentList.map((comment) => (
          <CommentBox
            key={comment._id}
            comment={comment}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
