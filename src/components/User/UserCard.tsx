import FollowButton from "../FollowButton";
import UserProfile from "../UserProfile";

export default function UserCard() {
  return (
    <div className="border-2 border-red-500 w-[404px] h-[132px] flex justify-between items-center">
      <UserProfile
        BackWidth="w-[132px]"
        BackHeight="h-[132px]"
        IconWidth="w-[92px]"
        IconHeight="h-[92px]"
      />
      <div>
        <div className="flex mb-6 border-2 border-red-500 gap-[32px] items-center">
          <p className="text-4xl">유저1</p>
          <FollowButton
            width="w-[128px]"
            height="h-[52px]"
            rounded="rounded-[15px]"
          />
        </div>
        <div className="flex text-2xl gap-[28px]">
          <p>팔로워: 0</p>
          <p>팔로우: 0</p>
        </div>
      </div>
    </div>
  );
}
