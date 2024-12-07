import UserBox from "./UserBox";
import closeIcon from "../../assets/close.svg";
import searchIcon from "../../assets/searchIcon.svg";

interface UserListModalType {
  handleBackClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function UserListModal({ handleBackClick }: UserListModalType) {
  return (
    <>
      <div
        className={`w-[380px] h-[600px]
      bg-white rounded-[25px] absolute bottom-[3px] left-[300px]
      before:modal-before  scrollbar-none flex flex-col justify-start items-center
      gap-10 py-8 z-30`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="w-[30px] h-[30px] absolute top-3 right-3 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] rounded-[50%]
          flex items-center justify-center
        "
          onClick={(e) => handleBackClick(e)}
        >
          <img src={closeIcon} alt="닫기 버튼" />
        </div>
        <div className="relative flex justify-center items-center mt-4">
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
