import { twMerge } from "tailwind-merge";
import searchIcon from "../assets/searchIcon.svg";

export default function SearchBar({
  placeholder,
  style,
}: {
  placeholder: string;
  style?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex justify-center items-center px-4 py-3 rounded-[25px] border border-gray-300 gap-2 w-[785px]",
        style
      )}
    >
      <input
        className="w-full outline-none"
        type="text"
        placeholder={placeholder}
      />
      <img src={searchIcon} alt="검색 아이콘" />
    </div>
  );
}
