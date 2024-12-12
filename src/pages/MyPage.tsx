import UserCard from "../components/User/UserCard";
import { useAuth } from "../stores/authStore";
import UserProfile from "../components/UserProfile";
import thumbnail from "../assets/images/feed_thumbnail.jpg";
import likeIcon from "../assets/like_icon.svg";
import chatIcon from "../assets/chat_icon.svg";
import ImageCard from "../components/ImageCard";

export default function MyPage() {
  const myInfo = useAuth((state) => state.user)!;
  console.log(myInfo);

  return (
    <div className="flex flex-col items-center relative">
      <div className=" w-[1200px] flex flex-col gap-[40px]">
        <UserCard
          uname={myInfo.fullName}
          followers={myInfo.followers}
          following={myInfo.following}
          BackWidth="w-[100px]"
          BackHeight="h-[100px]"
          IconWidth="w-[80px]"
          IconHeight="h-[80px]"
          edit={true}
          update={true}
          userImg={myInfo.image}
        />

        <div>
          <p className="font-semibold text-[22px] mb-[20px]">
            게시물 {myInfo.posts.length}개
          </p>
          <div className="flex items-center justify-center">
            <div className="grid gap-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
              {/* imageCard 부분 타입 충돌이 있어서 따로 가져왔습니다. */}
              {myInfo.posts.map((post) => {
                const update = new Date();
                const date = update.toLocaleDateString("ko-KR").slice(0, -1);

                function isValidJson(data: string) {
                  try {
                    JSON.parse(data);
                    return true; // 유효한 JSON
                  } catch (e) {
                    return false; // 잘못된 JSON
                  }
                }

                let postTitle = "";
                if (isValidJson(post.title)) {
                  const parsedData = JSON.parse(post.title);
                  postTitle = parsedData.HTitle;
                } else {
                  // title이 JSON이 아닌 경우
                  postTitle = post.title;
                }
                return (
                  <div
                    className="flex flex-col items-center gap-3"
                    key={post._id}
                  >
                    {/* 썸네일 */}
                    <div
                      className="group relative w-[250px] h-[250px] bg-cover bg-center rounded-2xl shadow-lg"
                      style={{
                        backgroundImage: `url(${post.image || thumbnail})`,
                      }}
                    >
                      {/* Hover */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100">
                        <h3 className="w-[80%] text-[20px] font-semibold truncate">
                          {postTitle}
                        </h3>
                        {/* 아이콘 */}
                        <div className="absolute bottom-6 right-6 flex gap-[18px] text-xl font-normal ">
                          <div className="flex gap-1">
                            <img src={likeIcon} alt="좋아요 아이콘" />
                            <span>{post.likes.length}</span>
                          </div>
                          <div className="flex gap-1">
                            <img src={chatIcon} alt="채팅 아이콘" />
                            <span>{post.comments.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 글 작성자 정보 */}
                    <div className="flex items-center justify-between w-full px-2">
                      <div className="flex items-center gap-[10px]">
                        <UserProfile
                          BackWidth="w-[40px]"
                          BackHeight="h-[40px]"
                          IconWidth="w-[28px]"
                          IconHeight="h-[28px]"
                          userImg={myInfo.image}
                        />
                        <div className="text-base font-medium">
                          {myInfo.fullName}
                        </div>
                      </div>
                      <div className="text-base font-light">{date}</div>
                    </div>
                  </div>
                );
              })}

              {myInfo.posts.map((post) => {
                return (
                  <ImageCard
                    key={post._id}
                    image={post.image}
                    comments={post.comments}
                    createdAt={post.updatedAt}
                    likes={post.likes}
                    title={post.title}
                    fullName={myInfo.fullName}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
