import CommentBox from "../components/PostDetail/CommentBox";
import CommentForm from "../components/PostDetail/CommentForm";
import PostInfo from "../components/PostDetail/PostInfo";
import leftIcon from "../assets/double-left.svg";
import rightIcon from "../assets/double-right.svg";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

// 아직 comments 타입을 정확히 지정하지않았다.
interface PostInfo {
  fullName: string;
  userID: string;
  createdAt: string;
  title: string;
  image: string;
  comments: CommentType[];
  desc: string;
  likes: LikeType[];
}

export default function PostDetail() {
  const [data, setData] = useState<PostInfo | null>(null);

  const getPostData = async () => {
    try {
      // 여기에 포스트 id 값 넣기
      const { data } = await api.get("/posts/6759314fde84b53b732ceea7");
      const {
        author: { fullName, _id },
        comments,
        title,
        createdAt,
        image,
        likes,
      } = data;
      const { HTitle, desc } = JSON.parse(title);
      setData({
        fullName,
        userID: _id,
        comments,
        title: HTitle,
        desc,
        createdAt,
        image,
        likes,
      });
      console.log(data);
      console.log("댓글", data.comments);
    } catch (error) {
      console.error("Error fetching post data: ", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (!data) return <h1>렌더링중</h1>;

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-[766px] py-12 h-fit">
        {/* 포스트 정보  */}
        <PostInfo
          title={data.title}
          desc={data.desc}
          createdAt={data.createdAt}
          image={data.image}
          fullName={data.fullName}
        />
        <div className="flex justify-between">
          <div className="w-[360px] border-2 -[64px] flex items-center gap-4 rounded-[8px]">
            <img src={leftIcon} alt="leftIcon" />
            <span>이전 포스트</span>
          </div>
          <div className="w-[360px] border-2 h-[64px] flex items-center gap-4 justify-end rounded-[8px]">
            <span>다음 포스트</span>
            <img src={rightIcon} alt="leftIcon" />
          </div>
        </div>

        {/* 코멘트 폼 */}
        <div className="mt-4">
          <CommentForm likes={data.likes} comments={data.comments} />
        </div>

        <div className="">
          {/* 댓글 박스 */}
          <CommentBox />
          <CommentBox />
          <CommentBox />
          <CommentBox />
          <CommentBox />
        </div>
      </div>
    </div>
  );
}
