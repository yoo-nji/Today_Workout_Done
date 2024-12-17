import { api } from "../api/axios";
import { createNotification } from "./api/createNotification";

export const addPostLike = async (postId: string) => {
  try {
    const { data } = await api.post("/likes/create", { postId });

    const rtype = "LIKE";
    const likeId = data._id;

    // Todo - 여기서도 글쓴이 ID값을 받아올 방법 찾아서 넣어주기
    await createNotification(rtype, likeId, "675fcec7f707bd088eee7545", postId);
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
