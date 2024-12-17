import FollowButton from "../FollowButton";
import { useAuth } from "../../stores/authStore";
import defaultUserImg from "../../assets/defaultUser.svg";
import { useState } from "react";

interface UserInfoCardType {
  userId: string;
  uname: string;
  followers: FollowersType[];
  following: FollowingType[];
  image?: string | null;
}

export default function UserInfoCard({
  userId,
  uname,
  followers,
  following,
  image,
}: UserInfoCardType) {
  const myfollowing = useAuth((state) => state.user?.following);
  const [userFollowers, setUserFollowers] = useState(followers.length);
  const [followingList, setFollowingList] = useState(myfollowing);
  const isLogin = useAuth((state) => state.isLoggedIn);
  return (
    <div className="w-[350px] flex items-center gap-[30px] text-base">
      <div>
        <img
          src={image ? image : defaultUserImg}
          alt="사용자 프로필 사진"
          className="w-full h-full rounded-[50%]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <div className="text-lg font-bold w-[83px] h-[44px] pt-[5px] pb-[28px]">
            {uname}
          </div>

          {isLogin && (
            <FollowButton
              width="w-[80px]"
              height="h-[30px]"
              rounded="rounded-[10px]"
              userid={userId}
              followingList={followingList}
              setFollowingList={setFollowingList}
              setUserFollowers={setUserFollowers}
            />
          )}
        </div>
        <div className="flex text-[15px] gap-[10px] ">
          <p>팔로워: {userFollowers}</p>
          <p>팔로우: {following.length}</p>
        </div>
      </div>
    </div>
  );
}
