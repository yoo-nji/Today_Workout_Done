import { api } from "../api/axios";

export const addPostLike = async (postId: string) => {
  try {
    const { data } = await api.post("/likes/create", { postId });

    // console.log("좋아요 등록:", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const removePostLike = async (likeId: string | undefined) => {
  try {
    const { data } = await api.delete("/likes/delete", {
      data: { id: likeId },
    });
    // console.log("좋아요 취소:", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
