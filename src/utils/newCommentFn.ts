import { api } from "../api/axios";

export const newCommentFn = async (newComment: string, postId: string) => {
  try {
    const { data } = await api.post("/comments/create", { newComment, postId });
    // 응답 처리
    console.log("댓글 등록 성공:", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
