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
  // 유저목록
  const [userList, setUserList] = useState<UserListType[]>();

  const [isLoading, setIsLoading] = useState(false);
  const [userListError, setUserListError] = useState(false);

  // 검색 유저
  const [searchUser, setSearchUser] = useState("");

  // 검색 중
  const [isSearching, setIsSearching] = useState(false);

  // 검색한 유저 저장
  const [getUser, setGetUser] = useState<SearchUserType[]>();

  useEffect(() => {
    const setUser = async () => {
      try {
        setIsLoading(true);
        const userListData = await getUserList();
        setUserList(userListData);
      } catch (error) {
        console.log(error);
        setUserListError(true);
      } finally {
        setIsLoading(false);
      }
    };
    setUser();
  }, []);

  // 검색 디바운스 처리
  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      setIsSearching(true);
      if (searchUser.length > 0) {
        const search = async (searchQuery: string) => {
          try {
            console.log("haha");
            const user = await searchUserFn(searchQuery);
            setGetUser(user);
          } catch (err) {
            console.log(err);
          }
        };
        search(searchUser);
      }
    }, 1500);

    return () => {
      clearTimeout(searchDebounce);
      setIsSearching(false);
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
          {!isSearching && getUser ? (
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
          )}

          {/* 처음 렌더링 됐을 때는 전체 유저 보여주기 */}
          {/* 가져오는 중에는 로딩 중.. */}
          {!isLoading && !searchUser ? (
            userList?.map((user) => {
              return user.role !== "SuperAdmin" ? (
                <UserBox
                  key={user._id}
                  fullname={user.fullName}
                  followers={user.followers}
                  following={user.following}
                  isOnline={user.isOnline}
                />
              ) : null;
            })
          ) : (
            <p>로딩중 ...</p>
          )}

          {/* 검색 중이면 빈 화면 */}

          {/* 검색 완료 후 정상 -> 유저 정보 */}

          {/* 유저정보 없음 -> 없음 렌더링 */}
        </div>
      </div>
    </>
  );
}
