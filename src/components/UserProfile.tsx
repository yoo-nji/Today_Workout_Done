import { twMerge } from "tailwind-merge";
import defaultUser from "../assets/defaultUser.svg";
import profileEdit from "../assets/profile-edit.svg";

export default function UserProfile({
  edit,
  BackWidth,
  BackHeight,
  IconWidth,
  IconHeight,
  onClick,
}: userProfileType) {
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center shadow-profile-inner rounded-[50%] cursor-pointer",
        BackWidth,
        BackHeight
      )}
    >
      <img
        className={twMerge(IconWidth, IconHeight)}
        src={defaultUser}
        alt="userProfile"
        onClick={onClick}
      />
      {/* edit 기능 있는 유저 프로필 */}
      {edit && (
        <img
          className="absolute right-[-10px] bottom-[-10px]"
          src={profileEdit}
          alt="profile-edit"
          onClick={onClick}
        />
      )}
    </div>
  );
}
