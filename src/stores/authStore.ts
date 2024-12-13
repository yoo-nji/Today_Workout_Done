import { create } from "zustand";

// 내정보랑 유저정보의 타입에서 posts부분이 조금 다른게 있어서 변경했습니다 기존의 UserInfo 타입은
// UserInfo.d.ts파일에 넣어놨습니다. 확인하시고 주석지워주세요
interface MyInfo {
  role: string;
  emailVerified: false;
  banned: false;
  isOnline: true;
  posts: MyInfoPost[];
  likes: string[];
  comments: string[];
  followers: string[];
  following: string[];
  notifications: string[];
  messages: string[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  image: string;
  imagePublicId: string;
  coverImage: string;
  coverImagePublicId: string;
}

interface MyInfoPost {
  likes: string[];
  comments: string[];
  _id: string;
  title: string;
  image: string;
  imagePublicId: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Auth {
  user: MyInfo | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  setUser: (u: MyInfo) => void;
}

export const useAuth = create<Auth>((set) => ({
  user: null,
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, user: null }),
  setUser: (u: MyInfo) => set({ user: u }),
}));
