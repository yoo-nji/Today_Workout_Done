import { api } from "../api/axios";
import { createNotification } from "./api/createNotification";

export const follow = async (userId: string, myId: string) => {
  try {
    const { data } = await api.post("/follow/create", { userId });

    await createNotification("FOLLOW", myId, userId, null);
    // console.log("팔로우 성공", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const unfollow = async (id: string | undefined) => {
  try {
    const { data } = await api.delete(`/follow/delete`, {
      data: { id },
    });
    // console.log("팔로우 취소", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
