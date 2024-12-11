import uploadImgIcon from "../../assets/uploadImgIcon.svg";
import selectChannel from "../../assets/selectChannel.svg";
import writeTitle from "../../assets/writeTitle.svg";
import { useEffect, useState } from "react";

interface PostStatusProps {
  img: string;
  title: string;
  desc: string;
  channel: string;
}

export default function PostStatus({
  img,
  title,
  desc,
  channel,
}: PostStatusProps) {
  const [iconStatus, setIconStatus] = useState<
    "upload" | "selectChannel" | "write"
  >("upload");

  useEffect(() => {
    if (img.length > 0 && !title && !desc && channel === "게시판 선택")
      setIconStatus("selectChannel");
    else if (img.length > 0 && channel !== "게시판 선택" && !title && !desc)
      setIconStatus("write");
    else if (img.length < 1) setIconStatus("upload");
  }, [img, channel]);

  return (
    <div className="w-[250px] h-[45px] flex items-center justify-between border-t border-[#a3badc] mt-3">
      {/* 아이콘 */}
      <div
        className={`w-[45px] flex flex-col justify-center items-center gap-2`}
      >
        <div
          className={`w-[45px] h-[45px] rounded-[50%] ${
            iconStatus === "upload" ? "bg-[#265CAC]" : "bg-[#92ADD5]"
          } flex justify-center items-center `}
        >
          <img
            src={uploadImgIcon}
            alt="이미지 업로드 아이콘"
            className="w-[30px] h-[30px] block "
          />
        </div>
        <p
          className={`${
            iconStatus === "upload" ? "text-[#265CAC]" : "text-[#92ADD5]"
          } text-center leading-[16px]`}
        >
          이미지 등록
        </p>
      </div>

      <div
        className={`w-[45px] flex flex-col justify-center items-center gap-2`}
      >
        <div
          className={`w-[45px] h-[45px] rounded-[50%] ${
            iconStatus === "selectChannel" ? "bg-[#265CAC]" : "bg-[#92ADD5]"
          } flex justify-center items-center`}
        >
          <img
            src={selectChannel}
            alt="게시판 아이콘"
            className="w-[30px] h-[30px] block"
          />
        </div>
        <p
          className={`${
            iconStatus === "selectChannel" ? "text-[#265CAC]" : "text-[#92ADD5]"
          } text-center leading-[16px]`}
        >
          게시판 선택
        </p>
      </div>

      <div
        className={`w-[45px] flex flex-col justify-center items-center gap-2`}
      >
        <div
          className={`w-[45px] h-[45px] rounded-[50%] ${
            iconStatus === "write" ? "bg-[#265CAC]" : "bg-[#92ADD5]"
          } flex justify-center items-center`}
        >
          <img
            src={writeTitle}
            alt="작성 아이콘"
            className="w-[30px] h-[30px] block ml-[6px]"
          />
        </div>
        <p
          className={`${
            iconStatus === "write" ? "text-[#265CAC]" : "text-[#92ADD5]"
          } text-center leading-[16px]`}
        >
          내용 작성
        </p>
      </div>
    </div>
  );
}
