import defaultUserImg from "../assets/defaultUser.svg";

interface NotificationBoxPropsType {
  fullname: string;
  image?: string | null;
  userid: string;
  notificationType: string;
}

export default function NotificationBox({
  fullname,
  image,
  userid,
  notificationType,
}: NotificationBoxPropsType) {
  return (
    <div className="w-[320px] h-[75px] bg-[#EFEFEF] mt-4 flex items-center gap-3 pl-[20px] rounded-[10px] flex-shrink-0 ">
      {/* 유저 프로필, 현활 */}
      <div
        className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[50%] shadow-inner cursor-pointer relative"
        // onClick={() => handleClick(userid)}
      >
        <img
          src={image ? image : defaultUserImg}
          alt="사용자 프로필 사진"
          className="w-[35px] h-[35px] rounded-[50%]"
        />
      </div>

      {notificationType === "follow" && (
        <div className=" w-[220px] h-[50px] items-center bg">
          <article className="text-xs font-bold">
            {fullname} 님께서 회원님을 팔로우합니다!
          </article>
          <div className="flex items-center w-full mt-1"></div>
        </div>
      )}
      {notificationType === "comment" && (
        <div className="w-[220px] h-[50px] ">
          <p className="text-xs font-bold">
            {fullname} 님께서 회원님의 글에 댓글을 남겼습니다{" "}
          </p>
          <article className="text-xs mt-0.5 line-clamp-2 pr-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi dolor
            commodi perspiciatis distinctio vero unde deleniti! Laudantium
            blanditiis pariatur fugiat autem, quos enim doloribus itaque iste
            ullam assumenda eius corrupti!
          </article>
        </div>
      )}
      {notificationType === "message" && (
        <div className=" w-[230px] h-[50px]">
          <p className="text-xs font-bold ">
            {fullname} 님께서 회원님께 메세지를 보냈습니다
          </p>
          <article className="text-xs mt-0.5 line-clamp-2 pr-2 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            at rerum velit? Eveniet nihil aperiam ut eius, nemo suscipit ullam
            modi vel, voluptas eos porro accusamus numquam? Sunt, recusandae
            temporibus.
          </article>
        </div>
      )}
    </div>
  );
}
