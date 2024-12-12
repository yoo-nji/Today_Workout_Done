import { useParams } from "react-router";
import UserCard from "../components/User/UserCard";
//import ImageCard from "../components/ImageCard";

export default function User() {
  const { user_id } = useParams();
  return (
    <div className="flex flex-col items-center">
      <div className="border-2 border-blue-500 gap-[68px] flex flex-col mt-[120px]">
        <UserCard uname={`유저${user_id}`} />
        <div>
          게시물 12개
          <div className="flex items-center">
            <div className="grid gap-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
              {/* props 적어주면 적용됩니다! */}
              {/* <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
