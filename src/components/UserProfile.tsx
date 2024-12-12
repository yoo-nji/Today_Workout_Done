import { twMerge } from "tailwind-merge";
import defaultUser from "../assets/defaultUser.svg";
import profileEdit from "../assets/profile-edit.svg";
import { useRef, useState } from "react";
import { updateUserImg } from "../utils/updateUserImg";

export default function UserProfile({
  edit,
  BackWidth,
  BackHeight,
  IconWidth,
  IconHeight,
  onClick,
  update,
  userImg,
}: userProfileType) {
  const imgRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleImgUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!imgRef.current || !imgRef.current.files) return;

    const formData = new FormData();

    formData.append("isCover", "false");
    formData.append("image", imgRef.current.files[0]);

    console.log(formData);
    try {
      setIsLoading(true);
      const response = await updateUserImg(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center shadow-profile-inner rounded-[50%] cursor-pointer",
        BackWidth,
        BackHeight
      )}
    >
      <img
        className={twMerge(IconWidth, IconHeight, "rounded-[50%]")}
        src={userImg ? userImg : defaultUser}
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
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="editProfileImg"
            ref={imgRef}
            onChange={handleImgUpdate}
          />
          <label htmlFor="editProfileImg">
            <img
              className="absolute right-[-10px] bottom-[-10px] cursor-pointer"
              src={profileEdit}
              alt="profile-edit"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
