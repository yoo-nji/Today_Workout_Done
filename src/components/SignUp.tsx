import { api } from "../api/axios";
import { Navigate } from "react-router";

export default function Register() {
  const signupHandler = async () => {
    try {
      const { status, data } = await api.post("/signup", {
        // 각자 별도의 회원가입 정보 입력
        email: "wjw1469@gmail.com",
        fullName: "우정완2",
        password: "asdf1234",
      });

      if (status === 200) {
        console.log(data);
        // 로그인 화면으로 전환
        // Navigate("/login");
      } else if (status === 400) {
        console.log("중복 로그인!");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={signupHandler}>signUp</button>
    </>
  );
}
