import { twMerge } from "tailwind-merge";
import defaultUser from "../assets/defaultUser.svg";
import profileEdit from "../assets/profile-edit.svg";
import home from "../assets/icons/home_icon.svg";
import { useRef, useState } from "react";
import { updateUserImg } from "../utils/updateUserImg";
import { useLoadingStore } from "../stores/loadingStore";

export default function UserProfile({
  edit,
  BackWidth,
  BackHeight,
  IconWidth,
  IconHeight,
  onClick,
  update,
  userImg,
  myProfile,
}: userProfileType) {
  const imgRef = useRef<HTMLInputElement>(null);

  // 로딩중
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const handleImgUpdate = async () => {
    if (!imgRef.current || !imgRef.current.files) return;

    const formData = new FormData();

    formData.append("isCover", "false");
    formData.append("image", imgRef.current.files[0]);

    console.log(formData);
    try {
      startLoading();
      const response = await updateUserImg(formData);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
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


      {/* 로그인 유저 마이페이지 아이콘 표시 */}
      {myProfile && (
        <img
          className="absolute right-[-10px] bottom-[-10px]"
          src={home}
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
