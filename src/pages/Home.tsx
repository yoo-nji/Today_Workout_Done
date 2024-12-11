import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import Tag from "../components/Tag";
import { useEffect, useState } from "react";
import { useChannelStore } from "../stores/channelStore";
import { api } from "../api/axios";

export default function Home() {
  const channelId = useChannelStore((state) => state.channelId);

  const [posts, setPosts] = useState<PostType[]>([]);

  const getChannelPost = async () => {
    try {
      const { data } = await api.get(`/posts/channel/${channelId}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!channelId) return;

    getChannelPost();
  }, [channelId]);

  return (
    <div className="flex flex-col items-center gap-16 mt-8">
      <div className="flex flex-col items-center gap-[30px] w-full px-4">
        <SearchBar
          placeholder="검색어를 입력해 주세요"
          style="w-full max-w-[785px]"
        />
        <div className="flex gap-[19px]">
          <Tag>#오운완</Tag>
          <Tag>#오운완</Tag>
          <Tag>#오운완</Tag>
        </div>
      </div>
      {/* 피드 이미지 */}
      <div className="flex items-center">
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-8">
          {posts.length > 0 &&
            posts.map((post) => <ImageCard key={post._id} {...post} />)}
        </div>
      </div>
    </div>
  );
}
