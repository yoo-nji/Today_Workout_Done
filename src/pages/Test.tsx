import { useEffect, useState } from "react";
import { Comment, getPostDetail } from "../utils/getPostDetail";

export default function test() {
  //댓글 목록
  const [comments, setComments] = useState<Comment[]>([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 에러 상태
  const [error, setError] = useState(false);

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

  if (isLoading) return <p>댓글 불러오는 중...</p>;
  if (error) return <p>댓글을 불러오는데 실패했습니다.</p>;

  return (
    <>
      <pre>{JSON.stringify(comments, null, 2)}</pre>
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
            <button className="border border-red-600 p-1">삭제</button>
          </div>
        </div>
      ))}
    </>
  );
}
