import thumbnail from "../assets/images/feed_thumbnail.jpg";
import likeIcon from "../assets/like_icon.svg";
import chatIcon from "../assets/chat_icon_black.svg";
import UserProfile from "./UserProfile";

export default function Review({
  image,
  title,
  likes,
  comments,
  createdAt,
  author,
}: PostType) {
  const update = new Date(createdAt);
  const date = update.toLocaleDateString("ko-KR").slice(0, -1);

  function isValidJson(data: string) {
    try {
      JSON.parse(data);
      return true; // 유효한 JSON
    } catch (e) {
      return false; // 잘못된 JSON
    }
  }

  let postTitle = "";
  let postContent = "";
  if (isValidJson(title)) {
    const parsedData = JSON.parse(title);
    postTitle = parsedData.HTitle;
    postContent = parsedData.desc;
  } else {
    // title이 JSON이 아닌 경우
    postTitle = title;
    postContent = title;
  }
  return (
    <div className="w-[1080px] h-[315px] relative flex flex-row">
      {/* 썸네일 */}
      <div
        className="group relative w-[500px] h-[300px] bg-cover bg-center
        rounded-[15px] shadow-lg mr-[60px] items-start"
        style={{ backgroundImage: `url(${image || thumbnail})` }}
      />
      <div className="">
        {/* 글 작성자 정보 */}
        <div className="flex justify-start mb-[30px]">
          <div className="flex flex-row gap-[13px]">
            <UserProfile
              BackWidth="w-[40px]"
              BackHeight="h-[40px]"
              IconWidth="w-[28px]"
              IconHeight="h-[28px]"
            />
            <div className="flex flex-col">
              <div className="">{author.fullName}</div>
              <div className="">{date}</div>
            </div>
          </div>
        </div>
        <h3 className="ml-[45px] mb-[30px] text-[24px] ">{postTitle}</h3>
        <p className="ml-[45px] text-[16px]  w-[475px] h-[120px] line-clamp-5">
          {postContent}
        </p>
        {/* 아이콘 */}
        <div className="absolute flex flex-row gap-[18px] bottom-1 right-1">
          <div className="flex flex-row gap-1">
            <img src={likeIcon} alt="좋아요 아이콘" />
            <span>{likes.length}</span>
          </div>
          <div className="flex flex-row gap-1">
            <img src={chatIcon} alt="채팅 아이콘" />
            <span>{comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
