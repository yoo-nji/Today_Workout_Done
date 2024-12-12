import thumbnail from "../assets/images/feed_thumbnail.jpg";
import likeIcon from "../assets/like_icon.svg";
import chatIcon from "../assets/chat_icon.svg";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router";

export default function ImageCard({
  image,
  title,
  likes,
  comments,
  createdAt,
  author,
  _id: post_id,
}: PostType) {
  const navigate = useNavigate();
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
  if (isValidJson(title)) {
    const parsedData = JSON.parse(title);
    postTitle = parsedData.HTitle;
  } else {
    // title이 JSON이 아닌 경우
    postTitle = title;
  }

  //const { HTitle } = JSON.parse(title);
  return (
    <div className="flex flex-col items-center gap-3">
      {/* 썸네일 */}
      <div
        className="group relative w-[250px] h-[250px] bg-cover bg-center rounded-2xl shadow-lg cursor-pointer"
        style={{ backgroundImage: `url(${image || thumbnail})` }}
        onClick={() => navigate(`/records/${post_id}`)}
      >
        {/* Hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100">
          <h3 className="w-[80%] text-[20px] font-semibold truncate">
            {postTitle}
          </h3>
          {/* 아이콘 */}
          <div className="absolute bottom-6 right-6 flex gap-[18px] text-xl font-normal ">
            <div className="flex gap-1">
              <img src={likeIcon} alt="좋아요 아이콘" />
              <span>{likes.length}</span>
            </div>
            <div className="flex gap-1">
              <img src={chatIcon} alt="채팅 아이콘" />
              <span>{comments.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 글 작성자 정보 */}
      <div className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-[10px]">
          <UserProfile
            BackWidth="w-[40px]"
            BackHeight="h-[40px]"
            IconWidth="w-[28px]"
            IconHeight="h-[28px]"
          />
          <div className="text-base font-medium">{author.fullName}</div>
        </div>
        <div className="text-base font-light">{date}</div>
      </div>
    </div>
  );
}
