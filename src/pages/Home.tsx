import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import Tag from "../components/Tag";
import { useEffect, useState } from "react";
import { useChannelStore } from "../stores/channelStore";
import { api } from "../api/axios";
import scrollUp from "../assets/scrollUp.svg";

export default function Home() {
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
    <div>
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
      </div>
      <div>
        {/* 피드 이미지 */}
        <div className="flex flex-col items-center mt-8">
          <div className="grid gap-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
            {searchPosts.length > 0 ? (
              searchPosts.map((post) => <ImageCard key={post._id} {...post} />)
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
        {/* 위로 가기 버튼 */}
        <form className="fixed right-[10px] bottom-[10px] z-50 w-[50px]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={scrollUp}
              alt="위로 이동"
              className="rounded-full shadow-xl"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
