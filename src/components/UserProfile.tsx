import { twMerge } from "tailwind-merge";
import defaultUser from "../assets/defaultUser.svg";
import profileEdit from "../assets/profile-edit.svg";
import { useRef, useState } from "react";

export default function UserProfile({
  edit,
  BackWidth,
  BackHeight,
  IconWidth,
  IconHeight,
  onClick,
  update,
}: userProfileType) {
  const [updateImg, setUpdateImg] = useState("");
  const imgRef = useRef(null);

  const imgUpdate = () => {};
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

      {/* 업데이트 기능이 있는 유저 */}
      {update ? (
        <form>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="editProfileImg"
            ref={imgRef}
          />
          <label htmlFor="editProfileImg">
            <img
              className="absolute right-[-10px] bottom-[-10px] cursor-pointer"
              src={profileEdit}
              alt="profile-edit"
            />
          </label>
        </form>
      ) : null}
    </div>
  );
}
