import { api } from "../api/axios";

export const follow = async (userId: string) => {
  try {
    const { data } = await api.post("/follow/create", { userId });

    console.log("팔로우 성공", data);
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
    console.log("팔로우 취소", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
