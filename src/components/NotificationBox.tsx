import { useNavigate } from "react-router";
import defaultUserImg from "../assets/defaultUser.svg";

interface NotificationBoxPropsType {
  fullname: string;
  image?: string | null;
  userid: string;
  notificationType: string;
}

export default function NotificationBox({
  fullname,
  image,
  userid,
  notificationType,
}: NotificationBoxPropsType) {
  const navigate = useNavigate();

  return (
    <div className="w-[270px] h-[75px] bg-[#EFEFEF] mt-4 flex items-center gap-3 pl-[20px] rounded-[10px] flex-shrink-0 ">
      {/* 유저 프로필, 현활 */}
      <div
        className="bg-white w-[46px] h-[46px] flex justify-center items-center rounded-[50%] shadow-inner cursor-pointer relative"
        // onClick={() => handleClick(userid)}
      >
        <img
          src={image ? image : defaultUserImg}
          alt="사용자 프로필 사진"
          className="w-[33px] h-[33px] rounded-[50%]"
          onClick={() => {
            navigate(`/user/${userid}`);
          }}
        />
      </div>

      {notificationType === "follow" && (
        <div className=" w-[220px] h-[50px] flex items-center ">
          <article className="text-sm font-bold ">
            {fullname} 님께서 <br />
            회원님을 팔로우합니다!
          </article>
        </div>
      )}
      {notificationType === "comment" && (
        <div className="w-[220px] h-[50px] flex items-center ">
          <p className="text-sm font-bold ">
            {fullname} 님께서 <br /> 회원님의 글에 댓글을 남겼습니다{" "}
          </p>
        </div>
      )}
      {notificationType === "like" && (
        <div className=" w-[230px] h-[50px] flex items-center   ">
          <p className="text-sm font-bold ">
            {fullname} 님께서 회원님께서 <br />
            글에 좋아요를 눌러주셨습니다
          </p>
        </div>
      )}
    </div>
  );
}
