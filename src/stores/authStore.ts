import { create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";
interface UserInfo {
  _id: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  role: string; // 예시로 "Regular"와 "Admin" 역할을 추가했습니다. 다른 역할이 있을 경우 수정 가능.
  banned: boolean;
  isOnline: boolean;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  followers: string[]; // 팔로워 목록 (user ID 배열)
  following: string[]; // 팔로우 목록 (user ID 배열)
  likes: string[]; // 좋아요 목록 (post ID 배열)
  comments: string[]; // 댓글 목록 (comment ID 배열)
  messages: string[]; // 메시지 목록 (message ID 배열)
  notifications: string[]; // 알림 목록 (notification ID 배열)
  posts: string[]; // 게시물 목록 (post ID 배열)
  __v: number; // 버전 번호 (MongoDB의 internal version)
}

interface Auth {
  user: UserInfo | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
  setUser: (u: UserInfo) => void;
}

// export const useAuth = create<Auth>((set) => ({
//   user: null,
//   isLoggedIn: false,
//   accessToken: null,
//   login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
//   logout: () => set({ isLoggedIn: false, accessToken: null }),
//   setUser: (u: UserInfo) => set({ user: u }),
// }));
export const useAuth = create(
  persist<Auth>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      accessToken: null,
      login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
      logout: () => set({ isLoggedIn: false, accessToken: null }),
      setUser: (u: UserInfo) => set({ user: u }),
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키 이름
    }
  )
);
