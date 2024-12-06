import defaultUserImg from "../../assets/defaultUser.svg";

export default function UserBox() {
  const dummyData = {
    fullname: "user1",
    image: defaultUserImg,
    isOnline: true,
    followers: ["user2", "user3"],
    following: ["user4", "user5"],
  };

  return (
    <div className="w-[320px] h-[75px] bg-[#EFEFEF] flex items-center gap-3 pl-[20px] rounded-[10px] flex-shrink-0">
      {/* 유저 프로필, 현활 */}
      <div className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[50%] shadow-inner cursor-pointer relative">
        <img src={dummyData.image} alt="사용자 프로필 사진" />
        {dummyData.isOnline && (
          <div className="w-3 h-3 rounded-[50%] bg-[#1CE777] absolute bottom-0 right-0"></div>
        )}
      </div>

      {/* 유저  info*/}
      <div>
        <div className="flex gap-3 items-center">
          <p className="font-bold text-[20px]">{dummyData.fullname}</p>
          <div className="bg-[#265CAC] text-white w-[90px] flex justify-center items-center h-[30px] rounded-[10px] text-sm cursor-pointer">
            팔로우
          </div>
        </div>
        <div className="text-[15px] flex gap-3 mt-[2px]">
          <p>팔로워: {dummyData.followers.length}</p>
          <p>팔로잉: {dummyData.following.length}</p>
        </div>
      </div>
    </div>
  );
}
