import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import Loading from "../components/Loading";
import { useLoadingStore } from "../stores/loadingStore";
import InfinityLoading from "../components/InfinityLoading";
import { getChannelPost } from "../utils/api/getChannelPost";
import { usesidebarToggleStore } from "../stores/sideberToggleStore";
import { twMerge } from "tailwind-merge";

// 무한스크롤에서 몇개씩 보여줄지 선택
const limit = 12;

export default function Home() {
  // 로딩 관리
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const isLoading = useLoadingStore((state) => state.isLoading);

  // 토글 유무 확인
  const isToggle = usesidebarToggleStore((state) => state.isToggle);
  console.log(isToggle);
  const location = useLocation();
  const channelRoute = location.pathname.split("/")[1];

  // 상태 관리
  // prettier-ignore
  const [status, setStatus] = useState<"idle" | "loading" | "searching">("idle");

  const [posts, setPosts] = useState<PostType[]>([]); // 게시글
  const [keyword, setKeyword] = useState(""); // 검색 키워드
  const [searchPosts, setSearchPosts] = useState<PostType[]>([]); // 검색 게시글  저장

  // 무한 스크롤 구현
  const [offset, setOffset] = useState(0); // 시작점
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState<number[]>([]); // 히스토리 기록
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const getData = async (offset: number) => {
    try {
      // 로딩 테스트: 나중에 지우기!! ❌
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      //로딩 시작 처음 렌더링때만 보이기
      if (offset === 0) startLoading();
      setLoading(true);
      const data = await getChannelPost(channelRoute, offset, limit);

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
    setKeyword("");
    setSearchPosts([]);
    setHasNextPage(true);
    getData(0);
  }, [location]);

  useEffect(() => {
    if (offset > 0) {
      getData(offset);
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
    if (!keyword) {
      setStatus("idle");
      setSearchPosts([]);
      return;
    }
    // 디바운스 적용
    const searchDebounce = setTimeout(() => {
      setStatus("searching");
      setSearchPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }, 1200);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [keyword]);

  return (
    <div
      className="relative flex flex-col gap-8 py-8 dark:bg-lightBlackDark"
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      {/* 로딩창 */}
      <Loading />

      {/* 검색 바 */}
      <div className="flex justify-center">
        <SearchBar
          placeholder="검색어를 입력해 주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style="w-full max-w-[785px]"
        />
      </div>

      {/* 피드 이미지 */}
      {/* <PostList /> 컴포넌트화 할때 사용 */}
      <div className="flex flex-col items-center mt-8">
        <div
          className={twMerge(
            "grid grid-cols-4 gap-8 ",
            isToggle
              ? "max-[1396px]:grid-cols-3 max-[1114px]:grid-cols-2 max-[832px]:grid-cols-1"
              : "max-[1176px]:grid-cols-3 max-[894px]:grid-cols-2 max-[612px]:grid-cols-1"
          )}
        >
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
