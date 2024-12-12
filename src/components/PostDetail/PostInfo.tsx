import { useRef, useState } from "react";
import UserProfile from "../UserProfile";
import { updatePost } from "../../utils/updatePost";

interface PostInfoProps {
  title: string;
  desc: string;
  createdAt: string;
  image: string;
  fullName: string;
  channelId: string;
  owner: boolean;
}

export default function PostInfo({
  title,
  desc,
  createdAt,
  image,
  fullName,
  channelId,
  owner,
}: PostInfoProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [titleInput, setTitleInput] = useState(title);
  const [context, setContext] = useState(desc);
  const [img, setImg] = useState(image);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [edit, setEdit] = useState(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; // 높이 초기화
      textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 내용에 맞게 높이 조정
    }
    setContext(e.target.value);
  };

  const updateHandler = async () => {
    const formData = new FormData();
    formData.append(
      "title",
      JSON.stringify({ HTitle: titleInput, desc: context })
    );
    formData.append("postId", "6759a934e7568a3d77d15e40");
    formData.append("channelId", channelId);
    if (uploadImg) {
      formData.append("image", uploadImg);
    }

    try {
      await updatePost(formData);
      alert("수정되었습니다.");
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editButtonHandler = () => {
    console.log(textarea.current);
    if (textarea.current) {
      console.log("hi");
      textarea.current.style.height = "auto"; // 높이 초기화
      textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 내용에 맞게 높이 조정
    }
    setEdit(true);
  };

  // 이미지 미리보기
  const handleChange = () => {
    if (imgRef.current && imgRef.current.files) {
      const image = imgRef.current.files[0];
      if (image.type.startsWith("image/")) {
        const imgUrl = URL.createObjectURL(image);
        setImg(imgUrl);
        setUploadImg(imgRef.current.files[0]);
      } else {
        alert("이미지 선택하세요");
      }
    }
  };

  // Date 객체로 변환
  const date = new Date(createdAt);
  // 원하는 포맷으로 변환
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  return (
    <>
      <div className=" text-sm">
        게시판이름 (넣을려고했는데 어떻게 처리할지고 고민중)
      </div>
      {edit ? (
        <input
          className="py-3 mb-4 text-4xl focus:outline-none border w-full border-[#d3d3d3d3]"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
      ) : (
        <h1 className="py-3 mb-4 text-4xl">{titleInput}</h1>
      )}
      <div className="flex items-center justify-between">
        {/* 왼쪽 프로필 */}
        <div className="flex gap-[10px] items-center">
          <UserProfile
            BackWidth="w-[36px]"
            BackHeight="h-[36px]"
            IconWidth="w-[25px]"
            IconHeight="h-[25px]"
          />
          <div>
            <p className="text-[13px] mb-[6px] font-bold">{fullName}</p>
            <p className="text-xs">{formattedDate}</p>
          </div>
        </div>
        {/* 오른쪽 수정 및 삭제 */}
        {owner &&
          (edit ? (
            <button onClick={updateHandler}>저장</button>
          ) : (
            <div className="flex gap-2 text-[#505050]">
              <button onClick={editButtonHandler}>수정</button>
              <button>삭제</button>
            </div>
          ))}
      </div>
      <div className="my-[30px] flex flex-col items-center">
        <div className="">
          {edit ? (
            <button>
              <input
                type="file"
                id="uploadImg"
                className="hidden"
                ref={imgRef}
                accept="image/*"
                onChange={handleChange}
              />
              <label htmlFor="uploadImg" className="cursor-pointer">
                <img src={img} alt="업로드이미지" />
              </label>
            </button>
          ) : (
            <img src={img} alt="업로드이미지" />
          )}
        </div>
        {edit ? (
          <div className="py-3 border border-[#d3d3d3d3] w-full mt-10">
            <textarea
              ref={textarea}
              className="w-full overflow-hidden resize-none focus:outline-none"
              onChange={(e) => handleInput(e)}
              value={context}
            >
              {context}
            </textarea>
          </div>
        ) : (
          <div className="w-full mt-10 py-3 whitespace-pre-line">{context}</div>
        )}
      </div>
    </>
  );
}
