import { twMerge } from "tailwind-merge";
import searchIcon from "../assets/searchIcon.svg";
import darkSearchIcon from "../assets/darkicons/darkSearchIcon.svg";
import { useDarkModeStore } from "../stores/darkModeStore";

export default function SearchBar({
  placeholder,
  style,
  value,
  onChange,
}: {
  placeholder: string;
  style?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <div
      className={twMerge(
        "flex justify-center items-center px-4 py-3 rounded-[25px] border border-gray-300 gap-2 w-[785px]",
        style
      )}
    >
      <input
        className="w-full outline-none dark:bg-lightBlackDark dark:text-[#fff]"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img src={!isDark ? searchIcon : darkSearchIcon} alt="검색 아이콘" />
    </div>
  );
}
