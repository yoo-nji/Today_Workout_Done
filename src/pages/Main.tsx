import { useEffect, useState } from "react";
import { api } from "../api/axios";
import SwiperCustom from "../components/main/SwiperCustom";
import BmiCon from "../components/main/BmiCon";

export default function Main() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [proteinPosts, setProteinPosts] = useState<PostType[]>([]);
  const [routinePosts, setRoutinePosts] = useState<PostType[]>([]);
  const [gymreviewPosts, setGymreviewPosts] = useState<PostType[]>([]);

  //TODO: 반복 작업 수정 필요
  const getChannelPost = async () => {
    try {
      const { data: posts } = await api.get(
        "/posts/channel/675a2e0d0d335f0ddae3a194"
      );
      const { data: proteinPosts } = await api.get(
        "/posts/channel/675a2dac0d335f0ddae3a188"
      );
      const { data: routinePosts } = await api.get(
        "/posts/channel/675a2dc40d335f0ddae3a18c"
      );
      const { data: gymreviewPosts } = await api.get(
        "/posts/channel/675a2ddc0d335f0ddae3a190"
      );
      setPosts(posts.slice(0, 10));
      setProteinPosts(proteinPosts.slice(0, 10));
      setRoutinePosts(routinePosts.slice(0, 10));
      setGymreviewPosts(gymreviewPosts.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getChannelPost();
  }, []);

  const category = [
    { title: "👋 오운완 인증 최신글", body: posts },
    { title: "💪 프로틴 추천 최신글", body: proteinPosts },
    { title: "✅ 루틴 공유 최신글", body: routinePosts },
    { title: "🏋️‍♂️ 헬스장 후기 최신글", body: gymreviewPosts },
  ];

  return (
    <>
      <div className="flex flex-col gap-20 w-full">
        <BmiCon />
        <div className="flex flex-col justify-center">
          {/* 게시글 피드 */}
          <div className="2xl:max-w-[1200px] xl:max-w-[884px] w-full mx-auto px-4 md:max-w-[582px] lg:max-w-[600px]">
            {category.map((list, i) => (
              <div key={i} className="mb-8">
                <h2 className="font-jalnan text-xl font-semibold mb-5">
                  {list.title}
                </h2>
                <SwiperCustom posts={list.body} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
