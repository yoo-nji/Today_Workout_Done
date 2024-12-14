import uploadImgIcon from "../../assets/uploadImgIcon.svg";
import selectChannel from "../../assets/selectChannel.svg";
import writeTitle from "../../assets/writeTitle.svg";

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
  return (
    <div className="w-[250px] h-[45px] flex items-center justify-between border-t border-[#c1c1c1] mt-3">
      {/* 아이콘 */}
      <div
        className={`w-[45px] flex flex-col justify-center items-center gap-2`}
      >
        <div
          className={`w-[45px] h-[45px] rounded-[50%] ${
            img ? "bg-[#1d8a1d] " : "bg-[#c1c1c1] "
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
            img ? "text-[#1d8a1d] " : "text-[#c1c1c1] "
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
            channel !== "게시판 선택" ? "bg-[#1d8a1d]" : "bg-[#c1c1c1]"
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
            channel !== "게시판 선택" ? "text-[#1d8a1d]" : "text-[#c1c1c1]"
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
            title && desc ? "bg-[#1d8a1d] " : "bg-[#c1c1c1] "
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
            title && desc ? "text-[#1d8a1d]" : "text-[#c1c1c1]"
          } text-center leading-[16px]`}
        >
          내용 작성
        </p>
      </div>
    </div>
  );
}
