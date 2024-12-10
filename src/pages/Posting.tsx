import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import downIcon from "../assets/down.svg";
import uploadImgIcon from "../assets/uploadImgIcon.svg";
import selectChannel from "../assets/selectChannel.svg";
import writeTitle from "../assets/writeTitle.svg";

export default function Posting() {
  const imgRef = useRef<HTMLInputElement>(null);
  // 이미지
  const [img, setImg] = useState<File>();
  // 제목
  const [title, setTitle] = useState("");
  // 설명
  const [desc, setDesc] = useState("");
  // 게시판
  const [channel, setChannel] = useState("게시판 선택");

  // api에 보낼 채널id
  const [channelId, setChannelId] = useState("");

  const [openChannel, setOpenChannel] = useState(false);

  const handleChange = () => {
    if (imgRef.current && imgRef.current.files) {
      console.log(imgRef.current.files);
    }
  };

  const channelClick = (channelName: string) => {
    setChannel(channelName);
  };

  const channels = [
    { id: "WorkoutDon", name: "오운완 인증" },
    { id: "Protein", name: "프로틴 추천" },
    { id: "Routine", name: "루틴 공유" },
    { id: "Gymreview", name: "헬스장 리뷰" },
  ];

  const channelBtnClick = () => {
    setOpenChannel((prev) => !prev);
  };

  return (
    <div className="flex justify-start items-start outline-none h-full bg-slate-100">
      <div className="m-auto pt-[20px] pb-[20px] h-[650px] bg-white flex flex-col items-center gap-5 rounded-[20px]">
        <h1 className="text-[#030712] font-bold text-[30px]">글쓰기</h1>
        {/* log */}
        <div className="w-[25%] h-[45px] flex items-center justify-between border-t border-[#a3badc] mt-3">
          {/* 아이콘 */}
          <div className="w-[45px] flex flex-col justify-center items-center gap-2 ">
            <div className="w-[45px] h-[45px] rounded-[50%] bg-[#265CAC] flex justify-center items-center ">
              <img
                src={uploadImgIcon}
                alt="이미지 업로드 아이콘"
                className="w-[30px] h-[30px] block "
              />
            </div>
            <p className="text-[#265CAC] text-center leading-[16px]">
              이미지 등록
            </p>
          </div>

          <div className="w-[45px] flex flex-col justify-center items-center gap-2">
            <div className="w-[45px] h-[45px] rounded-[50%] bg-[#92ADD5] flex justify-center items-center">
              <img
                src={selectChannel}
                alt="이미지 업로드 아이콘"
                className="w-[30px] h-[30px] block"
              />
            </div>
            <p className="text-[#92ADD5] text-center leading-[16px]">
              게시판 선택
            </p>
          </div>

          <div className="w-[45px] flex flex-col justify-center items-center gap-2">
            <div className="w-[45px] h-[45px] rounded-[50%] bg-[#92ADD5] flex justify-center items-center">
              <img
                src={writeTitle}
                alt="이미지 업로드 아이콘"
                className="w-[30px] h-[30px] block ml-[6px]"
              />
            </div>
            <p className="text-[#92ADD5] text-center leading-[16px]">
              내용 작성
            </p>
          </div>
        </div>

        <form className="w-[1000px] h-[480px] flex items-center justify-center gap-10 bg-white">
          {/* 이미지 등록 */}
          <div className=" h-[390px] flex flex-col justify-center items-center gap-3">
            <div className="w-[300px] h-full bg-[#F4F6F8] flex items-center justify-center rounded-[5px]">
              <p className="text-[#91989E] w-[80px] text-center">
                {!img ? "이미지 등록 필수입니다" : ""}
              </p>
            </div>
            <div>
              <input
                type="file"
                id="uploadImg"
                className="hidden"
                ref={imgRef}
                onChange={handleChange}
              />
              <label
                htmlFor="uploadImg"
                className="bg-[#B9B9B9] w-[180px] h-[40px] flex justify-center items-center cursor-pointer rounded-[5px] text-white"
              >
                이미지 파일 선택하기
              </label>
            </div>
          </div>

          {/* 게시글 정보 입력 폼 */}
          <div className="flex flex-col w-[500px] items-end gap-4">
            <div
              className="w-full h-[50px] relative bg-[#F4F6F8] flex justify-between items-center px-[15px] text-[18px] text-[#91989E] cursor-pointer"
              onClick={channelBtnClick}
            >
              {channel}
              <img
                src={downIcon}
                alt="down 아이콘"
                className="w-[20px] cursor-pointer"
              />
              <ul id="channel" className="absolute w-full left-0 top-[45px]">
                {channels.map((item) => {
                  return (
                    <li
                      key={item.id}
                      id={item.id}
                      className={twMerge(
                        `bg-white border w-full h-[45px] px-[10px] text-[18px] flex items-center justify-center hover:bg-rose-200 ${
                          openChannel ? "flex" : "hidden"
                        }`
                      )}
                      onClick={() => {
                        channelClick(item.name);
                        setChannelId(item.id);
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className=" w-full h-[50px] bg-[#F4F6F8]  outline-none text-[18px] px-[15px]"
              disabled={channelId ? false : true}
            />
            <textarea
              name="desc"
              id="desc"
              placeholder="내용을 작성해주세요"
              className=" resize-none outline-none w-full h-[200px] bg-[#F4F6F8] py-[10px] px-[15px] text-[20px]"
              maxLength={1000}
              disabled={channelId ? false : true}
            ></textarea>
            <button
              className="bg-[#4772b2] w-[80px] h-[40px] text-white rounded-[10px] cursor-pointer"
              disabled
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
