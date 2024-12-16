import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Following, useAuth } from "../stores/authStore";
import { follow, unfollow } from "../utils/followFn";

export default function FollowButton({
  width,
  height,
  rounded,
  userid,
  followingList,
  setFollowingList,
  setUserFollowers,
}: {
  width: string;
  height: string;
  rounded: string;
  userid: string;
  followingList: Following[] | undefined;
  setFollowingList: React.Dispatch<
    React.SetStateAction<Following[] | undefined>
  >;
  setUserFollowers: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const isLogin = useAuth((state) => state.isLoggedIn); // 로그인 상태
  const myId = useAuth((state) => state.user?._id); // 로그인 상태
  // console.log(myId);
  const [isFollowing, setIsFollowing] = useState<boolean>(false); //팔로우 상태

  useEffect(() => {
    if (!isLogin) return setIsFollowing(false);

    const isUserFollowing = followingList?.some((item) => item.user === userid);
    setIsFollowing(isUserFollowing || false);
  }, [followingList]);

  // 팔로우
  const handleFollow = async (userId: string) => {
    if (!isLogin) return;

    try {
      if (!isFollowing && myId) {
        //팔로우
        const data = await follow(userId);
        setFollowingList(
          (followingList) => followingList && [...followingList, data]
        );
        setUserFollowers((userFollowers) => [...userFollowers, myId]);
      } else if (isFollowing) {
        const id = followingList?.filter((item) => item.user === userid)[0]._id;
        // console.log(id);

        //팔로우 취소
        await unfollow(id);
        setFollowingList((followingList) =>
          followingList?.filter((item) => item._id !== id)
        );
        setUserFollowers((userFollowers) =>
          userFollowers.filter((id) => id !== myId)
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
