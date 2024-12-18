import ButtonComponent from "../ButtonComponent";
import likeIcon from "../../assets/noti_like_Icon.svg";
import followIcon from "../../assets/noti_follow_Icon.svg";
import commentIcon from "../../assets/icons/Comment_Icon.svg";
import NotificationBox from "../NotificationBox";
import { api } from "../../api/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../stores/authStore";

interface notificationProps {
  closeNoti: () => void;
  isNoti: () => void;
  notificationArray?: any;
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

  // map돌려서 알람갯수 세기
  const [showNotiList, setShowNotiList] = useState(true);

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
      notificationArray.map((notification: any) =>
        notification.like === null || undefined
          ? (likeCount = likeCount + 1)
          : notification.follow != undefined
          ? (followCount = followCount + 1)
          : (commentCount = commentCount + 1)
      );

      setNotificationNumber([commentCount, followCount, likeCount]);
    }
  }, []);

  // 여기에 좋아요, 팔로우, 메세지 갯수 받아서 사용
  // const [notificationNumber, setNotificationNumber] = useState([0, 0, 0]);

  // console.log({ likeNumber });
  return (
    <div>
      <div className="absolute z-10 top-[32px] right-[-10px] mt-2 w-[280px]  p-[18px] rounded-[10px] ">
        {/* 말풍선 꼬리 */}
        {/* Todo 말풍선 꼬리 tailwind로 만드는법 알아보자 */}
        {/* 말풍선 본문 */}
        <div
          className="w-[320px] max-h-[560px] overflow-y-scroll bg-white border border-gray-200 rounded-xl shadow-lg p-6 scrollbar-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-4 scrollbar-none">
            {/* 헤더고정부분 */}
            <div className="sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center w-full px-4 relative ">
                <img
                  src={commentIcon}
                  className="relative h-[42px]"
                  onClick={() => {
                    console.log("comment");
                  }}
                />
                {notificationNumber[0] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 left-12 text-white text-center z-50 text-xs leading-loose">
                    {notificationNumber[0] >= 100
                      ? `99+`
                      : notificationNumber[0]}
                  </div>
                )}
                <img
                  src={followIcon}
                  className="relative h-[37px]"
                  onClick={() => {
                    console.log("follow");
                  }}
                />
                {notificationNumber[1] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 left-36 text-white text-center z-50 text-xs leading-loose">
                    {notificationNumber[1] >= 100
                      ? `99+`
                      : notificationNumber[1]}
                  </div>
                )}
                <img
                  src={likeIcon}
                  className="relative h-[37px] z-40"
                  onClick={() => {
                    console.log("like");
                  }}
                />
                {notificationNumber[2] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 right-1.5 text-white justify-center text-center z-50 text-xs leading-loose">
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
            <div className="w-full overflow-y-auto max-h-[330px] scrollbar-none">
              {notificationArray.length && showNotiList ? (
                notificationArray.map((notification: any) => (
                  <NotificationBox
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
                  ></NotificationBox>
                ))
              ) : (
                <p>알림이 없습니다</p>
              )}
            </div>
            {/* 여기까지 */}
            {/* 푸터부분 */}
            <div className="sticky bottom-0 bg-white z-10">
              <div className="flex justify-end space-x-2 mt-4 ">
                <ButtonComponent
                  bgcolor="bg-white"
                  textcolor="text-[#265CAC]"
                  onClick={() => {
                    // Todo 모두읽기 기능 구현
                    notificationSeen();
                    isNoti();
                  }}
                >
                  {"모두읽기"}
                </ButtonComponent>
                <ButtonComponent
                  bgcolor="bg-[#265CAC]"
                  textcolor="text-[white]"
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
