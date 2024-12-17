import { useNavigate } from "react-router";
import logoImg from "../assets/loge.svg";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../stores/authStore";
import { api } from "../api/axios";
import { AxiosError } from "axios";
import { useToken } from "../stores/toeknStore";
import ConfirmModal from "../components/modal/ConfirmModal";

export default function Login() {
  const login = useAuth((state) => state.login);
  // 토큰 저장하기
  const setToken = useToken((state) => state.setToken);
  const setUser = useAuth((state) => state.setUser);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  // 모달 창 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue && !validateEmail(emailValue)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { status, data } = await api.post("login", {
        email,
        password,
      });
      if (status === 200) {
        setIsModalOpen(true);

        // 토큰 저장하기
        setToken(data.token);
        // 로그인
        // login();
        setUser(data.user);
      }
    } catch (error) {
      // error를 AxiosError로 명시적으로 타입 지정
      if ((error as AxiosError).response?.status === 400) {
        setIsErrorModalOpen(true);
        // alert("아이디나 비밀번호가 틀립니다.");
      }
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const isFormValid = email && password && emailError === "";

  return (
    <>
      <form
        className="px-[50px] w-[400px] h-[500px] rounded-[20px] bg-[#FFFFFF]"
        onSubmit={handleSubmit}
      >
        {/* 로고 */}
        <img src={logoImg} className="pt-[50px] block mx-auto " />
        {/* 제목 */}
        <p className="text-center text-[20px] mt-[20px] font-jua ">로그인</p>

        {/* 아이디 입력 필드 */}
        <input
          type="text"
          placeholder="아이디"
          value={email}
          onChange={handleEmailChange}
          className={twMerge(
            `w-full h-[40px] mb-[10px] py-auto pl-[15px] border border-[#C2C2C2] rounded-[10px] placeholder-[#B6B6B6] text-[18px] font-jua ${
              email
                ? "text-[#265CAC] border-[#265CAC] border-[2px] font-ibm font-bold text-[16px]"
                : "text-gray-400"
            }`
          )}
        />
        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={twMerge(
            `w-full h-[40px] mb-[10px] py-auto pl-[15px] border border-[#C2C2C2] rounded-[10px] placeholder-[#B6B6B6] text-[18px] font-jua ${
              password
                ? "text-[#265CAC] border-[#265CAC] border-[2px] text-[16px]"
                : "text-gray-400"
            }`
          )}
        />
        {/* 아이디 오류 메시지 출력 */}
        {emailError && (
          <p className="ml-[15px] mb-[10px] text-red-500 text-[13px] font-dohyeon ">
            {emailError}
          </p>
        )}

        {/* 로그인 버튼 */}
        <button
          className={twMerge(
            `w-full py-[5px] rounded-[20px] bg-[#265CAC] text-white text-[15px] font-jua`,
            emailError ? "mt-[5.5px]" : "mt-[35px]",
            isFormValid ? "" : "bg-[#BABABA] cursor-not-allowed"
          )}
        >
          로그인
        </button>

        {/* 가입하기 버튼 */}
        <button
          type="button"
          onClick={handleSignupClick}
          className="w-full mt-[10px] py-[5px] rounded-[20px] bg-[#265CAC] text-white text-[15px] font-jua"
        >
          가입하기
        </button>

        {/* 구분선 */}
        <div className="w-full mt-[15px] mb-[10px] py-auto border-t border-[#B6B6B6]"></div>

        {/* 저희 서비스가 궁금하세요? */}
        <p className="text-[#265CAC] text-[13px] text-center font-dohyeon mb-[10px]">
          저희 서비스가 궁금하신가요?
        </p>

        {/* 비회원 버튼 */}
        <button className="w-full h-[40px] py-auto border-2 border-[#265CAC]  rounded-[20px] bg-[#FFFFFF] text-[15px] font-jua">
          비회원으로 둘러보기
        </button>

        {/* 로그인 완료 됬을 때 모달*/}
        <ConfirmModal
          onlyConfirm
          isOpen={isModalOpen}
          onClose={() => navigate("/")}
          onConfirm={() => navigate("/")}
          message={"로그인되었습니다."}
          confirmColor="bg-[#265cac]"
        />
        {/* 로그인 실패 했을 때 모달*/}
        <ConfirmModal
          onlyConfirm
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          onConfirm={() => setIsErrorModalOpen(false)}
          message={"아이디나 비밀번호가 틀립니다."}
          confirmColor="bg-[#265cac]"
        />
      </form>
    </>
  );
}
