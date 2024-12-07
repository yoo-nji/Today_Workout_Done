import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-8 gap-16 ">
      {/* <div className="gap-4 m-4 space-x-4">
        <Signup />
        <Login />
      </div> */}
      {/* 검색창 */}
      <div className="flex flex-col items-center gap-[30px] w-full px-4">
        <SearchBar
          placeholder="검색어를 입력해 주세요"
          style="w-full max-w-[785px]"
        />
        <div>
          <span>#오운완</span>
          <span>#오운완</span>
          <span>#오운완</span>
        </div>
      </div>
      {/* 피드 이미지 */}
      <div className="flex flex-wrap max-w-[1675px] justify-center items-center gap-[30px]">
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </div>
  );
}
