import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../stores/authStore";
import { follow, unfollow } from "../utils/followFn";

export default function FollowButton({
  width,
  height,
  rounded,
  userid,
}: {
  width: string;
  height: string;
  rounded: string;
  userid: string;
}) {
  const isLogin = useAuth((state) => state.isLoggedIn); // 로그인 상태
  const [isFollowing, setIsFollowing] = useState<boolean>(false); //팔로우 상태
  const following = useAuth((state) => state.user?.following);
  const [followingList, setFollowingList] = useState(following); //팔로우 리스트
  // console.log(followingList);

  useEffect(() => {
    if (!isLogin) return setIsFollowing(false);

    const isUserFollowing = followingList?.some((item) => item.user === userid);
    setIsFollowing(isUserFollowing || false);
  }, [followingList]);

  // 팔로우
  const handleFollow = async (userId: string) => {
    if (!isLogin) return;

    try {
      if (!isFollowing) {
        //팔로우
        const data = await follow(userId);
        setFollowingList(
          (followingList) => followingList && [...followingList, data]
        );
      } else if (isFollowing) {
        const id = followingList?.filter((item) => item.user === userid)[0]._id;
        console.log(id);
        //팔로우 취소
        await unfollow(id);
        setFollowingList((followingList) =>
          followingList?.filter((item) => item._id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={() => {
        handleFollow(userid);
      }}
      className={twMerge(
        "bg-[#265CAC] hover:bg-[#1e4d8a] text-white flex justify-center items-center text-sm cursor-pointer",
        width,
        height,
        rounded,
        isFollowing
          ? "bg-[#646464] hover:bg-[#4b4b4b]"
          : "bg-[#265CAC] hover:bg-[#1e4d8a]"
      )}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </button>
  );
}
