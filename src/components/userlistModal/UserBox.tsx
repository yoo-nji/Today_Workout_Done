import defaultUserImg from "../../assets/defaultUser.svg";

interface UserBoxPropsType {
  isOnline?: boolean;
  fullname: string;
  followers: string[];
  following: string[];
}

export default function UserBox({
  fullname,
  followers,
  following,
  isOnline,
}: UserBoxPropsType) {
  return (
    <div className="w-[320px] h-[75px] bg-[#EFEFEF] flex items-center gap-3 pl-[20px] rounded-[10px] flex-shrink-0">
      {/* 유저 프로필, 현활 */}
      <div className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[50%] shadow-inner cursor-pointer relative">
        <img src={defaultUserImg} alt="사용자 프로필 사진" />
        {isOnline && (
          <div className="w-3 h-3 rounded-[50%] bg-[#1CE777] absolute bottom-0 right-0"></div>
        )}
      </div>

      {/* 유저  info*/}
      <div>
        <div className="flex gap-3 items-center">
          <p className="font-semibold text-[18px]">{fullname}</p>
          <div className="bg-[#265CAC] text-white w-[90px] flex justify-center items-center h-[30px] rounded-[10px] text-sm cursor-pointer">
            팔로우
          </div>
        </div>
        <div className="text-[15px] flex gap-3 mt-[2px]">
          <p>팔로워: {followers.length}</p>
          <p>팔로잉: {following.length}</p>
        </div>
      </div>
    </div>
  );
}
