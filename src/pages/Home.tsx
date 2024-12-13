import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import Tag from "../components/Tag";
import { useEffect, useState } from "react";
import { useChannelStore } from "../stores/channelStore";
import { api } from "../api/axios";
import { useLocation } from "react-router";

export default function Home() {
  const location = useLocation();
  const channelRoute = location.pathname.split("/")[1];
  const route: { [key: string]: string } = {
    protein: "6758f6bf5f86e71ae5eb9b6c",
    routine: "6758f7305f86e71ae5eb9b82",
  };
  // channelId
  const channelId = useChannelStore((state) => state.channelId);

  // 상태
  const [status, setStatus] = useState<
    "idle" | "loading" | "searching" | "nopost"
  >("idle");

  // 게시글
  const [posts, setPosts] = useState<PostType[]>([]);

  // 검색 게시글
  const [searchTerm, setSearchTerm] = useState<string>("");
  // 검색 게시글  저장
  const [searchPosts, setSearchPosts] = useState<PostType[]>([]);

  // 초기 렌더링

  const getChannelPost = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get(
        `/posts/channel/${route[channelRoute] || "6757a3a7ce18fa02ded5c758"}`
      );
      if (data.length === 0) {
        setStatus("nopost");
      }
      setPosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (!channelId) return;
    getChannelPost();
  }, [location]);

  // 검색 디바운스 처리
  useEffect(() => {
    if (!searchTerm) {
      setStatus("idle");
      setSearchPosts([]);
      return;
    }
    const searchDebounce = setTimeout(async () => {
      setStatus("searching");
      if (searchTerm.length > 0) {
        try {
          setStatus("loading");
          setSearchPosts(
            posts.filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } catch (err) {
          console.log(err);
        } finally {
          setStatus("searching");
        }
      }
    }, 1200);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [searchTerm]);

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
            {status === "loading" && <p>로딩중..</p>}

            {status === "searching" &&
              (searchPosts.length ? (
                searchPosts.map((post) => (
                  <ImageCard key={post._id} {...post} />
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              ))}

            {status === "idle" &&
              (posts.length ? (
                posts.map((post) => <ImageCard key={post._id} {...post} />)
              ) : (
                <p>로딩중...</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
