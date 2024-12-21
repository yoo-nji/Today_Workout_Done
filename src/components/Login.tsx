import { api } from "../api/axios";
import { useAuth } from "../stores/authStore";

export default function Login() {
  // const login = useAuthStore((state) => state.login);
  const login = useAuth((state) => state.login);
  const loginHandler = async () => {
    // const navigate = useNavigate();

    try {
      const { status, data } = await api.post("login", {
        email: "wjw1469@gmail.com",
        password: "asdf1234",
      });
      login(data.Token);
      //   Todo -> 로그인성공 후 이동페이지
      //   navagate("/");

      if (status === 200) {
        useAuth.getState().accessToken; // Todo토큰 제대로 저장되는지 콘솔로그 확인

        // 추후에 쓰일만한 userInfo  -> 필요하다면 Auth에 추가
        // console.log(data.user.posts); //내가 쓴 글
        // console.log(data.user.likes); //좋아요
        // console.log(data.user.messages); //메세지
        // console.log(data.user.notification); //알림
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {}
  };

  return <button onClick={loginHandler}>LogIn</button>;
}
