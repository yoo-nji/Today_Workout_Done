interface PostType {
  likes: string[];
  comments: string[];
  _id?: string;
  title: string;
  image: string;
  imagePublicId?: string;
  channel?: {
    authRequired: boolean;
    posts: string[];
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  author?: {
    role: string;
    emailVerified: boolean;
    banned: boolean;
    isOnline: boolean;
    posts: string[];
    //
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
    __v: number;
    username: string;
  };
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

interface MyInfo {
  fullName?: string;
  userImg: string;
}
