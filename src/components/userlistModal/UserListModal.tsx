import UserBox from "./UserBox";
import closeIcon from "../../assets/close.svg";
import searchIcon from "../../assets/searchIcon.svg";
import { useEffect, useState } from "react";
import UserNone from "./UserNone";
import { getUserList, UserListType } from "../../utils/getUserList";
import { searchUserFn, SearchUserType } from "../../utils/searchUser";

interface UserListModalType {
  handleBackClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function UserListModal({ handleBackClick }: UserListModalType) {
  // 상태
  const [status, setStatus] = useState<
    "idle" | "loading" | "searching" | "nouser"
  >("idle");

  // 유저목록
  const [userList, setUserList] = useState<UserListType[]>();

  const [userListError, setUserListError] = useState(false);

  // 검색 유저
  const [searchUser, setSearchUser] = useState("");

  // 검색한 유저 저장
  const [getUser, setGetUser] = useState<SearchUserType[]>();

  // 초치 렌더링 유저목록 불러오기
  useEffect(() => {
    const setUser = async () => {
      setStatus("loading");
      try {
        const userListData = await getUserList();
        setUserList(userListData);
      } catch (error) {
        console.log(error);
        setUserListError(true);
      } finally {
        setStatus("idle");
      }
    };
    setUser();
  }, []);

  // 검색 디바운스 처리
  useEffect(() => {
    if (!searchUser) {
      setStatus("idle");
      setGetUser(undefined);
      return;
    }
    const searchDebounce = setTimeout(async () => {
      setStatus("searching");
      if (searchUser.length > 0) {
        try {
          setStatus("loading");
          const users = await searchUserFn(searchUser);
          setGetUser(users);
        } catch (error) {
          console.error(error);
        } finally {
          setStatus("searching");
        }
      }
    }, 1200);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [searchUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  return (
    <>
      <div
        className={`w-[380px] h-[600px]
      bg-white rounded-[25px] absolute bottom-[3px] left-[300px]
      before:modal-before  scrollbar-none flex flex-col justify-start items-center
      gap-10 py-8 z-30`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="w-[30px] h-[30px] absolute top-3 right-3 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] rounded-[50%]
          flex items-center justify-center
        "
          onClick={(e) => handleBackClick(e)}
        >
          <img src={closeIcon} alt="닫기 버튼" />
        </div>
        <div className="relative flex justify-center items-center mt-4">
          <input
            className="px-5 py-2 w-[320px] rounded-[25px] border border-[rgb(208, 208, 208)]
            outline-none
          "
            type="text"
            placeholder="찾으시는 유저를 검색하세요"
            value={searchUser}
            onChange={handleChange}
          />
          <img
            src={searchIcon}
            alt="검색 아이콘"
            className="absolute  right-4"
          />
        </div>
        <div
          className="w-full h-full overflow-scroll flex flex-col justify-start
        items-center gap-4 scrollbar-none 
        "
        >
          {/* 로딩중 */}
          {status === "loading" && <p>로딩중..</p>}

          {status === "searching" &&
            (getUser?.length ? (
              getUser.map((user) => (
                <UserBox
                  key={user._id}
                  fullname={user.fullName}
                  followers={user.followers}
                  following={user.following}
                />
              ))
            ) : (
              <UserNone />
            ))}

          {status === "idle" &&
            (userList?.length ? (
              userList.map(
                (user) =>
                  user.role !== "SuperAdmin" && (
                    <UserBox
                      key={user._id}
                      fullname={user.fullName}
                      followers={user.followers}
                      following={user.following}
                      isOnline={user.isOnline}
                    />
                  )
              )
            ) : (
              <p>로딩중 ...</p>
            ))}

          {/* 초기 렌더링 오류 */}
          {userListError && (
            <div className="text-red-600 text-[20px] font-bold">
              오류가 발생했습니다
            </div>
          )}
        </div>
      </div>
    </>
  );
}
