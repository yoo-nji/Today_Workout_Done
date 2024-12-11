import { api } from "../api/axios";

interface PostingFnInfo {
  title: string;
  image: File | string;
  channelId: string;
}

export const postingFn = async (info: PostingFnInfo) => {
  try {
    const response = await api.post("/posts/create", {
      title: JSON.stringify(info.title),
      image: info.image,
      channelId: info.channelId,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
