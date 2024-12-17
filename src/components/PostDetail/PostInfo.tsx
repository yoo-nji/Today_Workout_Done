import { useRef, useState, useEffect } from "react";
import UserProfile from "../UserProfile";
import { updatePost } from "../../utils/updatePost";
import { deletePost } from "../../utils/api/deletePosts";
import { useNavigate } from "react-router";
import { channelMapping } from "../../constants/channel";
import thumbnail from "../../assets/images/feed_thumbnail.jpg";
import { useLoadingStore } from "../../stores/loadingStore";
import ConfirmModal from "../modal/ConfirmModal";

interface PostInfoProps {
  title: string;
  desc: string;
  createdAt: string;
  image: string;
  fullName: string;
  channelId: string;
  owner: boolean;
  postID: string;
  edit: boolean;
  userImg: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostInfo({
  title,
  desc,
  createdAt,
  image,
  fullName,
  channelId,
  owner,
  postID,
  edit,
  userImg,
  setEdit,
}: PostInfoProps) {
  // 삭제 모달 확인
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const imgRef = useRef<HTMLInputElement>(null);
  const [titleInput, setTitleInput] = useState(title);
  const [context, setContext] = useState(desc);
  const [img, setImg] = useState(image);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  // 로딩관리
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; // 높이 초기화
      textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 내용에 맞게 높이 조정
    }
    setContext(e.target.value);
  };

  // 게시물 정보 업데이트
  const updateHandler = async () => {
    const formData = new FormData();
    formData.append(
      "title",
      JSON.stringify({ HTitle: titleInput, desc: context })
    );
    formData.append("postId", postID);
    formData.append("channelId", channelId);
    if (uploadImg) {
      formData.append("image", uploadImg);
    }

    try {
      startLoading();
      await updatePost(formData);
      // alert("수정되었습니다.");
      setEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const editButtonHandler = () => {
    setEdit(true);
  };

  // 이미지 미리보기 & 이미지 업로드
  const handleChange = () => {
    if (imgRef.current && imgRef.current.files) {
      const image = imgRef.current.files[0];

      const imgUrl = URL.createObjectURL(image);

      // Image 객체를 사용하여 크기 확인
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        // 이미지가 로드된 후 너비와 높이 확인
        const width = img.width;
        const height = img.height;

        // 최소 이미지 크기 지정
        const minWidth = 400;
        const minHeight = 400;

        if (width < minWidth || height < minHeight) {
          alert(`이미지는 최소 ${minWidth}x${minHeight} 크기여야 합니다.`);
        } else {
          setImg(imgUrl); // 이미지 미리보기 URL 설정
          setUploadImg(image); // 이미지 파일 저장
        }
      };
    }
  };

  // 게시물 삭제 함수
  const deleteHandler = async () => {
    await deletePost(postID);
    setIsOpen(!isOpen);
    alert("삭제되었습니다");
    // 어디로 이동할지는 아직 미정입니다. 일단은 메인으로 이동하게 설정하였습니다.
    navigate("/");
  };

  // 삭제 모달 창 떴을 때 스크롤 제한
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 금지
    } else {
      document.body.style.overflow = ""; // 원래 상태 복원
    }
    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 복원
    };
  }, [isOpen]);

  // 수정 버튼 눌렀을 때 높이 조정
  useEffect(() => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; // 높이 초기화
      textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 내용에 맞게 높이 조정
    }
  }, [edit]);

  // Date 객체로 변환
  const date = new Date(createdAt);
  // 원하는 포맷으로 변환
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

  // 게시판 이름

  const channel = Object.keys(channelMapping).find(
    (key) => channelMapping[key] === channelId
  );

  const channelName: { [key: string]: string } = {
    records: "오운완 인증",
    protein: "프로틴 추천",
    routine: "루틴 공유",
    gymreview: "헬스장 리뷰",
  };

  return (
    <>
      <div
        className="text-sm cursor-pointer hover:underline"
        onClick={() => navigate(`/${channel}`)}
      >
        {channel ? channelName[channel] : null}
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
            userImg={userImg}
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
              <button onClick={() => setIsOpen(!isOpen)}>삭제</button>
            </div>
          ))}
      </div>
      <div className="my-[30px] flex flex-col items-center">
        <div className="">
          {edit ? (
            <>
              <input
                type="file"
                id="uploadImg"
                className="hidden"
                ref={imgRef}
                accept="image/*"
                onChange={handleChange}
              />
              <label htmlFor="uploadImg" className="cursor-pointer">
                <div className="relative group">
                  <img
                    src={img || thumbnail}
                    alt={img ? "업로드된 이미지" : "기본 썸네일"}
                    className=""
                  />
                  <div className="absolute flex flex-col justify-center items-center inset-0 text-[20px] text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>
                      수정하려면{" "}
                      <span className="text-[#265CAC] font-semibold">
                        이미지
                      </span>
                      를 클릭하고
                    </span>
                    <span>
                      <span className="text-[#265CAC] font-semibold">
                        새로운 파일
                      </span>
                      을 선택해주세요.
                    </span>
                  </div>
                </div>
              </label>
            </>
          ) : (
            <img
              src={img || thumbnail}
              alt={img ? "업로드된 이미지" : "기본 썸네일"}
            />
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
          <div className="w-full py-3 mt-10 whitespace-pre-line">{context}</div>
        )}
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={deleteHandler}
        message={"이 게시글을 정말 삭제하시겠습니까?"}
      />
    </>
  );
}
