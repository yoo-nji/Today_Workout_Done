import { api } from "../../api/axios";
import { channelMapping } from "../../constants/channel";

export const deletePost = async (postId: string) => {
  try {
    const { data } = await api.get(
      `/posts/channel/${channelMapping[channelRoute]}?offset=${offset}&limit=${limit}`
    );
  } catch (error) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
  }
};
