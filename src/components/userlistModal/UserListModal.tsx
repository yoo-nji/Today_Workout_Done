import UserBox from "./UserBox";
import searchIcon from "../../assets/searchIcon.svg";
export default function UserListModal() {
  return (
    <>
      <div
        className="w-[380px] h-[600px]
      bg-white rounded-[50px] absolute bottom-3 left-[280px]
      before:modal-before  scrollbar-none flex flex-col justify-start items-center
      gap-10 py-8
      "
      >
        <div className="relative flex justify-center items-center">
          <input
            className="px-5 py-2 w-[320px] rounded-[25px] border border-[rgb(208, 208, 208)]
            outline-none
          "
            type="text"
            placeholder="찾으시는 유저를 검색하세요"
          />
          <img
            src={searchIcon}
            alt="검색 아이콘"
            className="absolute  right-4"
          />
        </div>
        <div
          className="w-full h-full overflow-scroll flex flex-col justify-start
        items-center gap-4 scrollbar-none 
        "
        >
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
        </div>
      </div>
    </>
  );
}
