import { api } from "../api/axios";

interface newCommentFnType {
  comment: string;
  postId: string;
}

export const newCommentFn = async (option: newCommentFnType) => {
  try {
    const { data } = await api.post("/comments/create", option);
    // 응답 처리
    // console.log("댓글 등록 성공:", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const delCommentFn = async (commentId: string) => {
  try {
    await api.delete("/comments/delete", {
      data: { id: commentId },
    });
    // console.log(`삭제 성공: ${JSON.stringify(data)}`);
  } catch (err) {
    console.error("삭제 실패:", err);
  }
};
