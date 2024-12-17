import { api } from "../api/axios";
import { createNotification } from "./api/createNotification";

export const addPostLike = async (postId: string, postAuthorId: string) => {
  try {
    const { data } = await api.post("/likes/create", { postId });

    await createNotification("LIKE", data._id, postAuthorId, postId);
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
