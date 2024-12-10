import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import Tag from "../components/Tag";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-8 gap-16">
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
    </div>
  );
}
