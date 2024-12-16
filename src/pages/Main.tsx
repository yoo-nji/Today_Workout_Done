import { useEffect, useState } from "react";
import { api } from "../api/axios";
import SwiperCustom from "../components/main/SwiperCustom";
import banner from "../assets/images/banner.png";

export default function Main() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getChannelPost = async () => {
    try {
      const { data } = await api.get("/posts/channel/675a2e0d0d335f0ddae3a194");
      // console.log(data);
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getChannelPost();
  }, []);

  const category = [
    { title: "👋 오운완 인증 최신글!" },
    { title: "✅ 루틴 공유 최신글!" },
    { title: "💪 프로틴 추천 최신글!" },
    { title: "🏋️‍♂️ 헬스장 후기 최신글!" },
  ];

  return (
    <>
      <div className="w-full mt-[60px]">
        <div className="flex flex-col justify-center">
          {/* 게시글 피드 */}
          <div className="xl:max-w-[1200px] w-full mx-auto px-4 md:max-w-[582px] lg:max-w-[864px]">
            {category.map((list, i) => (
              <div key={i} className="mb-8">
                <h2 className="font-jalnan text-xl font-semibold mb-5">
                  {list.title}
                </h2>
                <SwiperCustom posts={posts} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
