import { Link } from "react-router";
import logoImg from "../assets/loge.svg";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const isFormValid = email && password && emailError === "";

  return (
    <>
      <form
        action=""
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
            `w-full py-[5px] rounded-[20px] bg-[#265CAC] text-white text-[15px] font-jua ${
              emailError ? "mt-[5.5px]" : "mt-[35px]"
            } ${isFormValid ? "" : "bg-[#BABABA] cursor-not-allowed"}`
          )}
        >
          로그인
        </button>

        {/* 가입하기 버튼 */}
        <button className="w-full mt-[10px] py-[5px] rounded-[20px] bg-[#265CAC] text-white text-[15px] font-jua">
          가입하기
        </button>

        {/* 구분선 */}
        <div className="w-full mt-[15px] mb-[10px] py-auto border-t border-[#B6B6B6]"></div>

        {/* 저희 서비스가 궁금하세요? */}
        <form className="flex justify-center items-center mb-[10px]">
          <Link
            to="/"
            className="text-[#265CAC] text-[13px] text-center font-dohyeon"
          >
            저희 서비스가 궁금하신가요?
          </Link>
        </form>

        {/* 비회원 버튼 */}
        <button className="w-full h-[40px] py-auto border-2 border-[#265CAC]  rounded-[20px] bg-[#FFFFFF] text-[15px] font-jua">
          비회원으로 둘러보기
        </button>
      </form>
    </>
  );
}
