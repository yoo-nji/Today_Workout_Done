import { useEffect, useState } from "react";
import { api } from "../api/axios";
import SearchBar from "../components/SearchBar";
import Review from "../components/Review";
import { useLocation } from "react-router";
import { channelMapping } from "../constants/channel";
import { useLoadingStore } from "../stores/loadingStore";
import Loading from "../components/Loading";

export default function ReviewPost() {
  // 로딩 관리
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const location = useLocation();
  const channelRoute = location.pathname.split("/")[1];
  // 상태
  const [status, setStatus] = useState<"idle" | "loading" | "searching">(
    "idle"
  );

  // 게시글
  const [posts, setPosts] = useState<PostType[]>([]);
  // 검색 게시글
  const [searchTerm, setSearchTerm] = useState<string>("");
  // 검색 게시글  저장
  const [searchPosts, setSearchPosts] = useState<PostType[]>([]);

  // 초기 렌더링
  const getChannelPost = async () => {
    try {
      startLoading();
      const { data } = await api.get(
        `/posts/channel/${channelMapping[channelRoute]}`
      );
      setPosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getChannelPost();
  }, []);

  // 검색 디바운스 처리
  useEffect(() => {
    // 검색어가 없으면 초기화
    if (!searchTerm) {
      setStatus("idle");
      setSearchPosts([]);
      return;
    }
    // 디바운스 적용
    const searchDebounce = setTimeout(() => {
      setStatus("searching");
      setSearchPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 1200);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [searchTerm]);

  return (
    <div className="relative flex flex-col items-center gap-8 py-8 dark:bg-lightBlackDark">
      {/* 로딩창 */}
      <Loading />
      {/* 검색창 */}
      <div className="flex justify-center w-full">
        <SearchBar
          placeholder="검색어를 입력해 주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style="w-full max-w-[785px] mb-8"
        />
      </div>
      {/* 피드 게시물 */}
      <div className="flex flex-col items-center gap-16">
        {status === "searching" &&
          (searchPosts.length ? (
            searchPosts.map((post) => <Review key={post._id} {...post} />)
          ) : (
            <p>검색 결과가 없습니다.</p>
          ))}

        {status === "idle" &&
          (posts.length ? (
            posts.map((post) => <Review key={post._id} {...post} />)
          ) : (
            <p>로딩중...</p>
          ))}
      </div>
    </div>
  );
}
