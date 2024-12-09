import { api } from "../api/axios";

export interface SearchUserType {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[];
  likes: string[];
  comments: string[];
  followers: [];
  following: [];
  notifications: string[];
  messages: string[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const searchUserFn = async (searchparams: string) => {
  try {
    const { data }: { data: SearchUserType[] } = await api(
      `/search/users/${searchparams}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
