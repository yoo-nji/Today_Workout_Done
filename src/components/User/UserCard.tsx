import { useRef, useState } from "react";
import FollowButton from "../FollowButton";
import UserProfile from "../UserProfile";
import { updateNameFn } from "../../utils/updateName";

interface UserCardType {
  uname: string;
  followers?: string[];
  following?: string[];
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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOutFocus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(true);
    if (updateName === uname) return;
    try {
      const response = await updateNameFn(e.target.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (updateName === uname) return;

    if (e.key === "Enter") {
      setDisabled(true);
      try {
        const response = await updateNameFn(updateName);
        console.log(response);
        inputRef.current?.blur();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[350px] h-[132px] flex justify-between items-center">
      <UserProfile
        BackWidth={BackWidth}
        BackHeight={BackHeight}
        IconWidth={IconWidth}
        IconHeight={IconHeight}
        edit={edit}
        update={update}
        userImg={userImg}
      />
      <div>
        <div className="flex mb-6 gap-[32px] items-center">
          <p className="text-4xl hidden">{uname}</p>
          {isFollowBtn && (
            <FollowButton
              width="w-[128px]"
              height="h-[52px]"
              rounded="rounded-[15px]"
            />
          )}
          {update && (
            <div className="absolute l-0">
              <input
                type="text"
                id="updateName"
                className="text-3xl font-bold w-[250px] py-[5px] disabled:bg-white"
                value={updateName}
                ref={inputRef}
                onChange={(e) => setUpdateName(e.target.value)}
                onBlur={handleOutFocus}
                onKeyDown={handleKeyDown}
                disabled={disabled}
              />
              <label
                htmlFor="updateName"
                className="ml-5 text-[18px] text-[#265CAC] underline
                cursor-pointer"
                onClick={() => setDisabled(false)}
              >
                수정
              </label>
            </div>
          )}
        </div>
        <div className="flex text-2xl gap-[28px]">
          <p>팔로워: {followers && followers.length}</p>
          <p>팔로우: {following && following.length}</p>
        </div>
      </div>
    </div>
  );
}
