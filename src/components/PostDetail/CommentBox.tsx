import UserProfile from "../UserProfile";
import trashIcon from "../../assets/trash.svg";
import { Comment } from "../../utils/getPostDetail";
import { useAuth } from "../../stores/authStore";
import { useNavigate } from "react-router";

export default function CommentBox({
  comment,
  handleDelete,
}: {
  comment: Comment;
  handleDelete: (commentId: string) => Promise<void>;
}) {
  // 사용자 정보 가져오기
  const loginId = useAuth((state) => state.user);
  const navigate = useNavigate();

  //날짜 포맷
  const update = new Date(comment.createdAt);
  // 연도, 월, 일 추출
  const year = update.getFullYear();
  const month = update.getMonth() + 1;
  const day = update.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const handleClick = (userid: string) => {
    navigate(`/user/${userid}`);
  };

  return (
    <div className="flex flex-col py-5 border-b border-gray-200">
      <div className="flex justify-between ">
        <div className="flex gap-[12px] w-fit items-center">
          <div onClick={() => handleClick(comment.author._id)}>
            <UserProfile
              BackWidth="w-[36px]"
              BackHeight="h-[36px]"
              userImg={comment.author.image}
            />
          </div>
          <div>
            <p className="text-[13px] mb-[4px] font-bold">
              {comment.author.fullName}
            </p>
            <p className="text-xs font-light">{formattedDate}</p>
          </div>
        </div>
        {loginId?._id === comment.author._id && (
          <button
            onClick={() => handleDelete(comment._id)}
            className="w-8 mr-2"
          >
            <img src={trashIcon} alt="trashIcon" />
          </button>
        )}
      </div>
      <div className="mt-3 text-[14px]">{comment.comment}</div>
    </div>
  );
}
