import ChannelList from "../ChannelList";

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center w-[350px] py-5 gap-8 text-[#1D1D1D] bg-[#FEFEFE] border-r border-gray-200/50">
      <button className="w-10 self-end mr-2">
        <img src="/src/assets/double-left.svg" alt="" />
      </button>
      {/* 로고 */}
      <a className="w-20 h-[53px]" href="/">
        <img src="/src/assets/loge.svg" alt="loge" />
      </a>
      {/* 멘트 */}
      <div className="flex flex-col items-center gap-[14px] pb-[23px] w-full">
        <div className="flex flex-col items-center text-center text-xl font-bold">
          <div>
            어서오세요{" "}
            <span className="text-[#265CAC] text-[26px] font-extrabold">
              수영
            </span>
            님
          </div>
          <div>오늘도 운동 완료하셨나요?</div>
        </div>
        {/* 유저 프로필 */}
        <div className="relative flex justify-center items-center w-[122px] h-[122px] shadow-profile-inner rounded-[50%] cursor-pointer">
          <img
            className="w-[84px] h-[84px]"
            src="/src/assets/defaultUser.svg"
            alt="userProfile"
          />
          <img
            className="absolute right-[-10px] bottom-[-10px]"
            src="/src/assets/profile-edit.svg"
            alt="profile-edit"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between w-full h-full">
        {/* 채널목록 */}
        <div className="w-full">
          <ul className="flex flex-col gap-1 w-full px-1">
            <ChannelList src="dumbbell_icon" alt="오운완 아이콘">
              오운완 인증
            </ChannelList>
            <ChannelList src="protein_icon" alt="프로틴 아이콘">
              프로틴 추천
            </ChannelList>
            <ChannelList src="routine_icon" alt="루틴 아이콘">
              루틴 공유
            </ChannelList>
            <ChannelList src="gym_icon" alt="헬스장 아이콘">
              헬스장 후기
            </ChannelList>
          </ul>
        </div>
        {/* 유저목록 버튼 */}
        <button className="self-center w-[243px] h-[50px] bg-[#3B6CB4] rounded-[20px] text-xl text-white font-bold">
          유저 목록
        </button>
      </div>
    </div>
  );
}
