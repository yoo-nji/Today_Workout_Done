import { twMerge } from "tailwind-merge";
import searchIcon from "../assets/searchIcon.svg";
import Tag from "./Tag";
import scrollUp from "../assets/scrollUp.svg";
export default function PostZero() {
  return (
    <div>
      <div className="flex flex-col items-center gap-16 mt-8">
        <div className="flex flex-col items-center gap-[30px] w-full px-4">
          <div
            className={twMerge(
              "flex justify-center items-center px-4 py-3 rounded-[25px] border border-gray-300 gap-2 w-[785px]"
            )}
          >
            <input
              className="w-full outline-none"
              type="text"
              placeholder="검색어를 입력해 주세요"
            />
            <img src={searchIcon} alt="검색 아이콘" />
          </div>
          <div className="flex gap-[19px]">
            <Tag>#오운완</Tag>
            <Tag>#오운완</Tag>
            <Tag>#오운완</Tag>
          </div>
        </div>
      </div>
      <div className="text-[25px] font-semibold text-[#265CAC]">
        등록된 게시물이 없습니다.
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
  );
}
