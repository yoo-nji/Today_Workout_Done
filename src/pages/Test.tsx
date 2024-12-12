import { useEffect, useState } from "react";
import { Comment, getPostDetail } from "../utils/getPostDetail";
import { delCommentFn, newCommentFn } from "../utils/commentFn";
import CommentBox from "../components/PostDetail/CommentBox";
import CommentForm from "../components/PostDetail/CommentForm";

export default function Test() {
  //댓글 목록
  const [comments, setComments] = useState<Comment[]>([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 에러 상태
  const [error, setError] = useState(false);
  // 댓글 인풋
  const [commentInput, setCommentInput] = useState<string>("");

  //댓글 목록 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const postDetail = await getPostDetail();
        setComments(postDetail?.comments || []); // 댓글 목록 상태 업데이트
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
  const handleCommentSubmit = async () => {
    const comment = "댓글 등록 테스트";
    const postId = "6757d369ce18fa02ded5c9ce";

    const option = {
      comment,
      postId,
    };

    try {
      const newComment = await newCommentFn(option);
      console.log(newComment);
      setComments((comments) => [...comments, newComment]);
    } catch (err) {
      console.log(err);
    }
  };

  //내가 작성한 댓글 삭제
  // 로컬스토리지에서 사용자 정보 가져오기
  const storedAuth = localStorage.getItem("auth-storage");
  const userId = storedAuth ? JSON.parse(storedAuth).state.user._id : null; //storedAuth가 존재하지 않으면 null을 반환

  const handleDelete = async (commentId: string) => {
    // 삭제할 id
    console.log(commentId);
    try {
      await delCommentFn(commentId);
      // 상태 업데이트
      setComments((comments) =>
        comments.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <p>댓글 불러오는 중...</p>;
  if (error) return <p>댓글을 불러오는데 실패했습니다.</p>;

  return (
    <>
      {/* 코멘트 폼 */}
      <div className="mt-4">
        <CommentForm setCommentInput={setCommentInput} />
      </div>

      <button onClick={handleCommentSubmit}>댓글 등록</button>
      <div className="max-w-md mx-auto p-4">
        {/* 댓글 입력 창 */}
        <div className="mb-4">
          <textarea
            className="w-full resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="댓글을 입력하세요..."
          ></textarea>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            댓글 추가
          </button>
        </div>
      </div>
      {/* 댓글 리스트 */}
      {comments.map((comment) => (
        <div className="space-y-4" key={comment._id}>
          <div className="border border-gray-300 rounded-md p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{comment.author.fullName}</span>
              <span className="text-sm text-gray-500">{comment.createdAt}</span>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
            {/* 댓글 작성자와 로그인한 사용자 비교 */}
            {userId === comment.author._id && (
              <button
                onClick={() => handleDelete(comment._id)} // 개별 댓글 ID 전달
                className="border border-red-600 p-1"
              >
                삭제
              </button>
            )}
          </div>
        </div>
      ))}
      <CommentBox />

      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </>
  );
}
