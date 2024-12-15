import { useNavigate } from "react-router";
import defaultUserImg from "../../assets/defaultUser.svg";
import FollowButton from "../FollowButton";
import { useAuth } from "../../stores/authStore";

interface UserBoxPropsType {
  isOnline?: boolean;
  fullname: string;
  followers: string[];
  following: string[];
  image?: string | null;
  userid: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserBox({
  fullname,
  followers,
  following,
  isOnline,
  image,
  userid,
  setIsOpen,
}: UserBoxPropsType) {
  const navigate = useNavigate();

  const handleClick = (userId: string) => {
    setIsOpen(false);
    navigate(`/user/${userId}`);
  };

  //로그인 여부
  const isLogin = useAuth((state) => state.isLoggedIn);
  return (
    <div className="w-[320px] h-[75px] bg-[#EFEFEF] flex items-center gap-3 px-[20px] rounded-[10px] flex-shrink-0">
      {/* 유저 프로필, 현활 */}
      <div
        className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[50%] shadow-inner cursor-pointer relative"
        onClick={() => handleClick(userid)}
      >
        <img
          src={image ? image : defaultUserImg}
          alt="사용자 프로필 사진"
          className="w-[35px] h-[35px] rounded-[50%]"
        />
        {isOnline && (
          <div className="w-3 h-3 rounded-[50%] bg-[#1CE777] absolute bottom-0 right-0"></div>
        )}
      </div>

      {/* 유저  info*/}
      <div className="w-full">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[18px]">{fullname}</p>
          {isLogin && (
            <FollowButton
              width="w-[90px]"
              height="h-[30px]"
              rounded="rounded-[10px]"
            />
          )}
        </div>
        <div className="text-[15px] flex gap-3 mt-[2px]">
          <p>팔로워: {followers.length}</p>
          <p>팔로잉: {following.length}</p>
        </div>
      </div>
    </div>
  );
}
