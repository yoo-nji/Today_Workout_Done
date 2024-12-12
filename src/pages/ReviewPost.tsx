import { useEffect, useState } from "react";
import { useChannelStore } from "../stores/channelStore";
import { api } from "../api/axios";
import SearchBar from "../components/SearchBar";
import Tag from "../components/Tag";
import Review from "../components/Review";

export default function ReviewPost() {
  const channelId = useChannelStore((state) => state.channelId);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchPosts, setSearchPosts] = useState<PostType[]>([]);

  const getChannelPost = async () => {
    try {
      const { data } = await api.get(`/posts/channel/${channelId}`);
      if (data.length === 0) {
        console.log("게시물이 없습니다.");
      }

      setPosts(data);
      setSearchPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!channelId) return;
    getChannelPost();
  }, [channelId]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchPosts(posts);
    } else {
      setSearchPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, posts]);
  return (
    <div className="flex flex-col items-center gap-16 mt-8">
      <div className="flex flex-col items-center gap-[30px] w-full px-4">
        <SearchBar
          placeholder="검색어를 입력해 주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style="w-full max-w-[785px]"
        />
        <div className="flex gap-[19px]">
          <Tag>#오운완</Tag>
          <Tag>#오운완</Tag>
          <Tag>#오운완</Tag>
        </div>
      </div>
      {/* 피드 게시물 */}
      <div className="flex items-center">
        <div>
          {searchPosts.length > 0 ? (
            searchPosts.map((post) => <Review key={post._id} {...post} />)
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
