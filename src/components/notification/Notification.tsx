import ButtonComponent from "../ButtonComponent";
import likeIcon from "../../assets/noti_like_Icon.svg";
import followIcon from "../../assets/noti_follow_Icon.svg";
import commentIcon from "../../assets/icons/Comment_Icon.svg";
import NotificationBox from "../NotificationBox";
import { api } from "../../api/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import darkCommentIcon from "../../assets/darkicons/darkCommentIcon.svg";
import darkFollowIcon from "../../assets/darkicons/darkFollowIcon.svg";
import darkLikeIcon from "../../assets/darkicons/darkLikeIcon.svg";
import { useDarkModeStore } from "../../stores/darkModeStore";
import { useAuth } from "../../stores/authStore";
import { twMerge } from "tailwind-merge";

interface notificationProps {
  closeNoti: () => void;
  isNoti: () => void;
  notificationArray?: any;
}

export interface notificationType {
  seen: boolean;
  _id: string;
  author: {
    role: string;
    emailVerified: boolean;
    banned: boolean;
    isOnline: boolean;
    posts: string[];
    likes: string[];
    comments: string[];
    followers: string[];
    following: string[];
    notifications: string[];
    messages: [];
    _id: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    username: null;
    image: string;
    imagePublicId: string;
  };
  user: string;
  post: string;
  follow?: string;
  like: null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API보고 notificationArray 받아서 처리하자
export default function Notification({
  closeNoti,
  isNoti,
  notificationArray,
}: notificationProps) {
  // 모두읽음처리
  const notificationSeen = async () => {
    try {
      // 전역 상태 업데이트
      setUser({
        ...userInfo,
        notifications: userInfo?.notifications?.splice(
          0,
          userInfo?.notifications?.length
        ),
      });
      const { status } = await api.put("/notifications/seen");
      try {
        setUser(userInfo);
      } catch (error) {
        if (status === 400) console.log(error);
      }

      // showNotiListHandler();
      notificationNumberClean();
    } catch (error) {
      console.log(error);
      if ((error as AxiosError).response?.status === 400) {
        alert("아이디나 비밀번호가 틀립니다.");
      }
    }
  };

  const userInfo = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const notificationNumberClean = () => {
    setNotificationNumber([0, 0, 0]);
  };

  const [isComment, setIsComment] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isLike, setIsLike] = useState(false);

  // map돌려서 알람갯수 세기
  const [showNotiList, setShowNotiList] = useState(true);

  const showCommentHandler = () => {
    setIsComment(!isComment);
    setIsFollow(false);
    setIsLike(false);
  };
  const showFollowHandler = () => {
    setIsFollow(!isFollow);
    setIsComment(false);
    setIsLike(false);
  };
  const showLikeHandler = () => {
    setIsLike(!isLike);
    setIsFollow(false);
    setIsComment(false);
  };

  const showNotiListHandler = () => {
    setShowNotiList(false);
    console.log(showNotiList);
  };

  // notificatioArray갯수 따라서 표시해주기
  // const notificationNumber: number[] = [0, 0, 0];
  const [notificationNumber, setNotificationNumber] = useState<number[]>([
    0, 0, 0,
  ]);

  useEffect(() => {
    if (notificationArray.length != 0) {
      console.log(notificationArray[0].like);
      let likeCount = 0;
      let followCount = 0;
      let commentCount = 0;
      notificationArray.map((notification: notificationType) =>
        notification.like === null || undefined
          ? (likeCount = likeCount + 1)
          : notification.follow != undefined
          ? (followCount = followCount + 1)
          : (commentCount = commentCount + 1)
      );

      setNotificationNumber([commentCount, followCount, likeCount]);
    }
  }, []);

  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <div>
      <div className="absolute z-10 top-[32px] right-[10%] mt-2 w-[280px] p-[18px] rounded-[10px] mr-[43px]">
        {/* 말풍선 본문 */}
        <div
          className="w-[390px] max-h-[560px] overflow-y-scroll bg-white border border-gray-200 rounded-xl shadow-lg p-6 scrollbar-none dark:bg-blackDark dark:border-darkGreyDark"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-0 scrollbar-none">
            {/* 헤더고정부분 */}
            <div className="sticky top-0 bg-white z-10 dark:bg-blackDark">
              <div className="flex justify-between items-center w-full px-10 relative ">
                <img
                  src={!isDark ? commentIcon : darkCommentIcon}
                  className={twMerge(
                    "relative h-[42px] z-40",
                    isComment && "border-b-4 border-b-blue-500 "
                  )}
                  onClick={() => {
                    showCommentHandler();
                  }}
                />
                {notificationNumber[0] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 left-16 text-white text-center  z-50 text-xs leading-loose">
                    {notificationNumber[0] >= 100
                      ? `99+`
                      : notificationNumber[0]}
                  </div>
                )}
                <img
                  src={!isDark ? followIcon : darkFollowIcon}
                  className={twMerge(
                    "relative h-[42px] z-40",
                    isFollow && "border-b-4 border-b-blue-500 "
                  )}
                  onClick={() => {
                    showFollowHandler();
                  }}
                />
                {notificationNumber[1] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 left-44 text-white text-center z-50 text-xs leading-loose">
                    {notificationNumber[1] >= 100
                      ? `99+`
                      : notificationNumber[1]}
                  </div>
                )}
                <img
                  src={!isDark ? likeIcon : darkLikeIcon}
                  className={twMerge(
                    "relative h-[42px] z-40",
                    isLike && "border-b-4 border-b-blue-500"
                  )}
                  onClick={() => {
                    showLikeHandler();
                  }}
                />
                {notificationNumber[2] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 right-8 text-white justify-center text-center z-50 text-xs leading-loose">
                    {notificationNumber[2] >= 100
                      ? `99+`
                      : notificationNumber[2]}
                  </div>
                )}
              </div>
              {/* 분단선 테스트 */}
              <div className="border-t w-full px-3 mt-3 pb-2"></div>
            </div>
            {/* 여기까지 */}
            {/* 바디부분 길이 초과시 스크롤나게 */}
            <div className="w-full overflow-y-auto max-h-[330px] scrollbar-none flex flex-col items-center">
              {/* 커멘트만 보여주기 */}
              {notificationArray && showNotiList && isComment ? (
                notificationArray
                  .filter(
                    (notification) => notification.comment === null || undefined
                  )
                  .map((notification: notificationType) => (
                    <NotificationBox
                      key={notification._id}
                      fullname={notification.author.fullName}
                      userid={notification.author._id}
                      image={notification.author.image}
                      notificationType={"comment"}
                      postId={notification?.post}
                      follow={notification?.follow}
                    ></NotificationBox>
                  ))
              ) : // 팔로우만 보여주기기
              notificationArray && showNotiList && isFollow ? (
                notificationArray
                  .filter(
                    (notification) => notification.follow != null || undefined
                  )
                  .map((notification: notificationType) => (
                    <NotificationBox
                      key={notification._id}
                      fullname={notification.author.fullName}
                      userid={notification.author._id}
                      image={notification.author.image}
                      notificationType={"follow"}
                      postId={notification?.post}
                      follow={notification?.follow}
                    ></NotificationBox>
                  ))
              ) : // 좋아요만 보여주기
              notificationArray && showNotiList && isLike ? (
                notificationArray
                  .filter(
                    (notification) => notification.like === null || undefined
                  )
                  .map((notification: notificationType) => (
                    <NotificationBox
                      key={notification._id}
                      fullname={notification.author.fullName}
                      userid={notification.author._id}
                      image={notification.author.image}
                      notificationType={"like"}
                      postId={notification?.post}
                      follow={notification?.follow}
                    ></NotificationBox>
                  ))
              ) : // 전체 다 보여주기
              notificationArray.length && showNotiList ? (
                notificationArray.map((notification: notificationType) => (
                  <NotificationBox
                    key={notification._id}
                    fullname={notification.author.fullName}
                    userid={notification.author._id}
                    image={notification.author.image}
                    notificationType={
                      notification.like === null || undefined
                        ? "like"
                        : notification.follow != undefined
                        ? "follow"
                        : "comment"
                    }
                    postId={notification?.post}
                    follow={notification?.follow}
                  ></NotificationBox>
                ))
              ) : (
                // 알림없을때 처리

                <p className="text-xl text-gray-500 my-10 jusitify-center items-center">
                  알림이 없습니다
                </p>
              )}
            </div>
            {/* 여기까지 */}
            {/* 푸터부분 */}
            <div className="sticky bottom-0 bg-white z-10 dark:bg-blackDark">
              <div className="flex justify-end space-x-2 mt-4 ">
                <ButtonComponent
                  bgcolor="bg-white dark:bg-blackDark dark:hover:bg-darkGreyDark"
                  textcolor="text-[#265CAC] dark:text-mainDark"
                  border="border-[1px] dark:border-mainDark"
                  onClick={() => {
                    // Todo 모두읽기 기능 구현
                    notificationSeen();
                    isNoti();
                  }}
                >
                  {"모두읽기"}
                </ButtonComponent>
                <ButtonComponent
                  bgcolor="bg-[#265CAC] dark:bg-mainDark dark:hover:bg-mainTextDark"
                  textcolor="text-[white] dark:text-blackDark"
                  onClick={closeNoti}
                >
                  {"닫기"}
                </ButtonComponent>
              </div>
            </div>
            {/* 여기까지 */}

            {/* 댓글의 앞부분 가져와서 한줄로 보여주고 길이초과시 ...처리  */}
          </div>
        </div>
      </div>
    </div>
  );
}
