import { useRef, useState } from "react";
import FollowButton from "../FollowButton";
import UserProfile from "../UserProfile";
import { updateNameFn } from "../../utils/updateName";
import { useLoadingStore } from "../../stores/loadingStore";
import { Following } from "../../stores/authStore";

interface UserCardType {
  uname: string;
  followers?: string[];
  following?: Following[];
  BackWidth: string;
  BackHeight: string;
  IconWidth: string;
  IconHeight: string;
  isFollowBtn?: boolean;
  edit?: boolean;
  update?: boolean;
  userImg?: string;
}

export default function UserCard({
  uname,
  followers,
  following,
  BackWidth,
  BackHeight,
  IconWidth,
  IconHeight,
  isFollowBtn,
  edit,
  update,
  userImg,
}: UserCardType) {
  const [disabled, setDisabled] = useState(true);
  const [updateName, setUpdateName] = useState(uname);

  // 로딩중
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOutFocus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(true);
    if (updateName === uname) return;
    try {
      startLoading();
      const response = await updateNameFn(e.target.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (updateName === uname) return;

    if (e.key === "Enter") {
      setDisabled(true);
      try {
        startLoading();
        const response = await updateNameFn(updateName);
        console.log(response);
        inputRef.current?.blur();
        window.location.reload();
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <div className="w-[350px] flex items-center gap-[30px] text-base">
      <UserProfile
        BackWidth={BackWidth}
        BackHeight={BackHeight}
        edit={edit}
        update={update}
        userImg={userImg}
      />
      <div className="flex flex-col gap-1">
        <div className="flex">
          {/* <p className="text-lg hidden">{uname}</p> */}
          {isFollowBtn && (
            <FollowButton
              width="w-[128px]"
              height="h-[52px]"
              rounded="rounded-[15px]"
            />
          )}
          {update && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="updateName"
                className="text-lg font-bold w-[180px] py-[5px] disabled:bg-white outline-none focus:border 
                focus: border-[#bcbcbc] rounded-[5px] px-[3px]"
                maxLength={8}
                value={updateName}
                ref={inputRef}
                onChange={(e) => setUpdateName(e.target.value)}
                onBlur={handleOutFocus}
                onKeyDown={handleKeyDown}
                disabled={disabled}
              />
              <label
                htmlFor="updateName"
                className=" text-[15px] leading-[15px] text-[#265CAC] underline
                cursor-pointer"
                onClick={() => setDisabled(false)}
              >
                수정
              </label>
            </div>
          )}
        </div>
        <div className="flex text-[15px] gap-[10px] ml-1">
          <p>팔로워: {followers && followers.length}</p>
          <p>팔로우: {following && following.length}</p>
        </div>
      </div>
    </div>
  );
}
