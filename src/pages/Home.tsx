import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import Tag from "../components/Tag";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/axios";
import { useLocation } from "react-router";
import Loading from "../components/Loading";
import { useLoadingStore } from "../stores/loadingStore";
import InfinityLoading from "../components/InfinityLoading";

const route: { [key: string]: string } = {
  protein: "675a2dac0d335f0ddae3a188",
  routine: "675a2dc40d335f0ddae3a18c",
};
const limit = 12;

export default function Home() {
  // 로딩 관리
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const isLoading = useLoadingStore((state) => state.isLoading);

  const location = useLocation();
  const channelRoute = location.pathname.split("/")[1];

  // 상태 관리
  // prettier-ignore
  const [status, setStatus] = useState<"idle" | "loading" | "searching">("idle");

  // 게시글
  const [posts, setPosts] = useState<PostType[]>([]);
  // 검색 게시글
  const [searchTerm, setSearchTerm] = useState<string>("");
  // 검색 게시글  저장
  const [searchPosts, setSearchPosts] = useState<PostType[]>([]);

  // 무한 스크롤 구현
  const [offset, setOffset] = useState(0); // 시작점
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState<number[]>([]); // 히스토리 기록
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const getChannelPost = async (offset: number) => {
    try {
      // 로딩 테스트: 나중에 지우기!! ❌
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      //로딩 시작 처음 렌더링때만 보이기
      if (offset === 0) startLoading();
      setLoading(true);

      const { data } = await api.get(
        `/posts/channel/${
          route[channelRoute] || "675a2e0d0d335f0ddae3a194"
        }?offset=${offset}&limit=${limit}`
      );

      // 데이터 존재하는지 확인 -> 데이터 없으면 데이상 보여줄게 없다.
      if (data.length === 0) setHasNextPage(false);
      setPosts((prev) => [...prev, ...data]);
      setPageParams((prev) => [...prev, offset]);
    } catch (err) {
      console.log(err);
    } finally {
      // 로딩종료
      if (offset === 0) stopLoading();
      setLoading(false);
    }
  };

  useEffect(() => {
    // 초기화
    setPosts([]);
    setOffset(0);
    setStatus("idle");
    setSearchTerm("");
    setSearchPosts([]);
    setHasNextPage(true);
    getChannelPost(0);
  }, [location]);

  useEffect(() => {
    if (offset > 0) {
      getChannelPost(offset);
    }
  }, [offset]);

  // observer를 통해 무한스크롤
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      // 화면에 보였을 때 실행할 함수
      if (firstEntry.isIntersecting && !loading) {
        setOffset((prev) => prev + limit);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
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
    <div
      className="relative flex flex-col gap-10 py-8 dark:bg-lightBlackDark"
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      {/* 로딩창 */}
      <Loading />

      {/* 검색 바 */}
      <div className="flex justify-center">
        <SearchBar
          placeholder="검색어를 입력해 주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style="w-full max-w-[785px]"
        />
      </div>

      {/* 피드 이미지 */}
      <div className="flex flex-col items-center mt-8">
        <div className="grid gap-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
          {status === "searching" &&
            (searchPosts.length ? (
              searchPosts.map((post) => <ImageCard key={post._id} {...post} />)
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

        {/* 무한스크롤 적용 */}
        <div ref={observerRef}>
          {hasNextPage && loading && <InfinityLoading />}
        </div>
      </div>
    </div>
  );
}
