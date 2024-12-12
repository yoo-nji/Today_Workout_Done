import ButtonComponent from "../ButtonComponent";
import likeIcon from "../../assets/noti_like_Icon.svg";
import followIcon from "../../assets/noti_follow_Icon.svg";
import messageIcon from "../../assets/noti_message_icon.svg";
import NotificationBox from "../NotificationBox";

interface notificationProps {
  closeNoti: () => void;
  //   notification: [number, number, number];
}

// 여기에 좋아요, 팔로우, 메세지 갯수 받아서 사용
const notification = [100, 1, 17];

// API보고 notificationArray 받아서 처리하자
export default function Notification({ closeNoti }: notificationProps) {
  return (
    <div>
      <div className="absolute z-10 top-[32px] right-[80px] mt-2 w-[280px]  p-[18px] rounded-[10px] ">
        {/* 말풍선 꼬리 */}
        {/* Todo 말풍선 꼬리 tailwind로 만드는법 알아보자 */}
        {/* 말풍선 본문 */}
        <div
          className="w-[390px] max-h-[560px] overflow-y-scroll bg-white border border-gray-200 rounded-xl shadow-lg p-6 scrollbar-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-4 scrollbar-none">
            {/* 헤더고정부분 */}
            <div className="sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center w-full px-4 relative ">
                <img
                  src={messageIcon}
                  className="relative"
                  onClick={() => {
                    console.log("message");
                  }}
                />
                {notification[2] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 left-14 text-white text-center text-xs leading-loose">
                    {notification[2] >= 100 ? `99+` : notification[2]}
                  </div>
                )}
                <img
                  src={followIcon}
                  className="relative"
                  onClick={() => {
                    console.log("follow");
                  }}
                />
                {notification[1] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 left-48 text-white text-center z-50 text-xs leading-loose">
                    {notification[1] >= 100 ? `99+` : notification[1]}
                  </div>
                )}
                <img
                  src={likeIcon}
                  className="relative z-40"
                  onClick={() => {
                    console.log("like");
                  }}
                />
                {notification[0] != 0 && (
                  <div className="w-6 h-6 rounded-[50%] bg-red-500 absolute bottom-0 right-2.5 text-white justify-center text-center z-50 text-xs leading-loose">
                    {notification[0] >= 100 ? `99+` : notification[1]}
                  </div>
                )}
              </div>
              {/* 분단선 테스트 */}
              <div className="border-t w-full px-3 mt-3 pb-2"></div>
            </div>
            {/* 여기까지 */}
            {/* 바디부분 길이 초과시 스크롤나게 */}
            <div className="w-full overflow-y-auto max-h-[330px] scrollbar-none">
              <div className="">
                <NotificationBox
                  fullname="정완"
                  userid="wjw1469"
                  notificationType="comment"
                />
                <NotificationBox
                  fullname="수영"
                  userid="wjw1469"
                  notificationType="comment"
                />
                <NotificationBox
                  fullname="규혁"
                  userid="wjw1469"
                  notificationType="follow"
                />
                <NotificationBox
                  fullname="윤지"
                  userid="wjw1469"
                  notificationType="follow"
                />
                <NotificationBox
                  fullname="송원"
                  userid="wjw1469"
                  notificationType="message"
                />
                <NotificationBox
                  fullname="정인"
                  userid="wjw1469"
                  notificationType="follow"
                />
              </div>
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
                    console.log(1111);
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
