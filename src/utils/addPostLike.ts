import { api } from "../api/axios";

export const addPostLike = async (postId: string) => {
  try {
    const response = await api.post("/likes/create", { postId });
    console.log(`좋아요 등록 성공: ${response}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
