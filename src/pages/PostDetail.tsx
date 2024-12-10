import UserProfile from "../components/UserProfile";
import likeIcon from "../assets/like_icon.svg";
import chatIcon from "../assets/chat_icon_black.svg";

export default function PostDetail() {
  return (
    <div className="flex justify-center w-full h-full border-2 border-red-500">
      <div className="w-[766px] border-2 border-blue-500 pt-12">
        <div className="mb-2 text-sm">게시판이름</div>
        <h1 className="mb-8 text-4xl">제목</h1>
        <div className="flex gap-[10px] border-blue-500 border-2 items-center">
          <UserProfile
            BackWidth="w-[36px]"
            BackHeight="h-[36px]"
            IconWidth="w-[25px]"
            IconHeight="h-[25px]"
          />
          <div>
            <p className="text-[13px] mb-[6px]">강수영</p>
            <p className="text-xs">2024.12.10</p>
          </div>
        </div>
        <div className="my-[30px] border border-green-500 flex flex-col items-center">
          <div className="border-2 border-red-500">
            <img
              src="https://image.ajunews.com/content/image/2024/01/21/20240121132054894779.jpg"
              alt=""
            />
          </div>
          <div className="w-full">안녕하세요 저는 코난 입니다</div>
        </div>

        {/* 댓글 area*/}
        <div className="border-2 border-red-500">
          {/* 좋아요 이모티콘 댓글 이모티콘 area */}
          <div className="flex gap-4 border-2 border-blue-500">
            <div className="flex gap-1">
              <img src={likeIcon} alt="likeIcon" />4
            </div>
            <div className="flex gap-1">
              <img src={chatIcon} alt="chatIcon" />4
            </div>
          </div>

          {/* 댓글작성 */}
          <div className="border-2 border-green-500 my-3 h-[100px] px-4 py-3 text-xs">
            댓글을 작성하세요
          </div>
          <div className="flex justify-between">
            <p>0/100</p>
            <button>댓글 작성</button>
          </div>
        </div>
      </div>
    </div>
  );
}
