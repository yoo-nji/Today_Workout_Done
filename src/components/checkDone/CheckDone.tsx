import { useEffect, useState } from "react";
import { useAuth } from "../../stores/authStore";
import CheckDoneMonth from "./CheckDoneMonth";
import DoneProgressBar from "./DoneProgressBar";

interface CheckDoneType {
  width?: string;
  textSize?: string;
  bg?: string;
}

export default function CheckDone({ width, textSize, bg }: CheckDoneType) {
  const CHANNEL_ID = "6757a3a7ce18fa02ded5c758";

  const myInfo = useAuth((state) => state.user)!;
  console.log(myInfo);

  const [checkNumber, setCheckNumber] = useState(0);

  useEffect(() => {
    if (!myInfo) return;

    const checkPosts = myInfo.posts.filter(
      (post) => post.channel === CHANNEL_ID
    );

    setCheckNumber(checkPosts.length);

    console.log(checkNumber);
  }, [myInfo]);

  return (
    <div
      className={`flex justify-center items-center gap-[20px] ${
        bg ? bg : ""
      } p-3 ${bg && "w-[400px] h-[220px] rounded-[10px]"}`}
    >
      <DoneProgressBar checkNumber={checkNumber} width={width} />
      <CheckDoneMonth checkNumber={checkNumber} textSize={textSize} />
    </div>
  );
}
