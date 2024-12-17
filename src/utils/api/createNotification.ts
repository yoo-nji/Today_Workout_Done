import { api } from "../../api/axios";

export const createNotification = async (
  notificationType: string,
  notificationTypeId: string,
  userId: string,
  postId?: string
) => {
  try {
    await api.post("/notifications/create", {
      notificationType,
      notificationTypeId,
      userId,
      postId,
    });
  } catch (error) {
    console.error("글 삭제 도중 오류가 발생했습니다.", error);
  }
};
