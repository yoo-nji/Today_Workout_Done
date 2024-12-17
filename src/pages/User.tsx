import { useParams } from "react-router";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import UserInfoCard from "../components/User/UserInfoCard";

export default function User() {
  const { user_id } = useParams();
  const [user, setUser] = useState<UserInfoType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get(`/users/${user_id}`);
        console.log("data", data);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user_id]);
  return (
    <>
      {user && (
        <div className="flex flex-col items-center">
          <div className=" flex flex-col gap-[40px] pt-10">
            <UserInfoCard
              uname={user.fullName}
              userId={user._id}
              followers={user.followers || []}
              following={user.following || []}
              image={user.image}
            />
            <div>
              <p className=" text-[18px] mb-[20px] font-medium ">
                게시물 {user.posts?.length}개
              </p>

              <div className="border-t pt-[10px] px-1 flex justify-center">
                {user.posts && user.posts.length > 0 ? (
                  <div className="flex flex-col items-start mt-[20px]">
                    <div className="flex items-center justify-center">
                      <div className="grid gap-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
                        {user.posts
                          ?.sort(
                            (a, b) =>
                              new Date(b.updatedAt).getTime() -
                              new Date(a.updatedAt).getTime()
                          )
                          .map((post) => (
                            <ImageCard
                              key={post._id}
                              image={post.image}
                              comments={post.comments}
                              createdAt={post.updatedAt}
                              likes={post.likes}
                              title={post.title}
                              fullName={user.fullName}
                              userImg={user.image}
                              _id={post._id}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-[814px]">
                    <p className="text-gray-500 text-center">
                      게시물이 없습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
