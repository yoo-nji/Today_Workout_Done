interface MyImageCardType {
  image: string;
  title: string;
  likes: {
    _id: string;
    user: string;
    post: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  comments: string[];
  createdAt: string;
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
    image?: string;
    imagePublicId?: string;
  };
  fullName?: string;
  userImg?: string; // 마이페이지, 로그인 한 유저의 사진
  _id: string;
  channel: string;
}
