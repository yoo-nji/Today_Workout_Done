import { useState } from "react";
import logoImg from "../assets/loge.svg";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;

    if (nameValue.includes(" ")) {
      setError("아이디에 공백이 포함될 수 없습니다.");
    } else {
      setError("");
    }

    setName(nameValue);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;

    if (emailValue.includes(" ")) {
      setError("이메일에 공백이 포함될 수 없습니다.");
    } else if (!validateEmail(emailValue)) {
      setError("올바른 이메일 형식이 아닙니다.");
    } else {
      setError("");
    }

    setEmail(emailValue);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (confirmPassword !== "" && confirmPassword !== newPassword) {
      setError("비밀번호가 일치하지 않음");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword === "") {
      setError("");
    } else if (newConfirmPassword !== password) {
      setError("비밀번호가 일치하지 않음");
    } else {
      setError("");
    }
  };

  const isFormValid =
    name &&
    !name.includes(" ") &&
    email &&
    !email.includes(" ") &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    error === "";

  return (
    <div className="bg-[#FFFFFF] rounded-[20px] border-red-500 w-[400px] h-[500px] mx-auto my-auto">
      {/* 로고 */}
      <img src={logoImg} className="pt-[50px] block mx-auto " />

      {/* 제목 */}
      <p className="text-center text-[20px] mt-[20px] font-jua ">
        새로운 계정 만들기
      </p>

      <form className="px-[50px]">
        {/* 이름 입력 필드 */}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          className={twMerge(
            `w-full h-[40px] py-auto pl-[15px] border rounded-[10px] mt-[10px] mb-[10px] font-jua text-[18px] ${
              name
                ? "text-[#265CAC] border-[#265CAC] border-[2px] text-[16px] font-ibm font-bold"
                : "text-gray-400"
            }`
          )}
        />

        {/* 이메일 주소 입력 필드 */}
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={handleEmailChange}
          className={twMerge(
            `w-full h-[40px] py-auto pl-[15px] border rounded-[10px] mb-[10px] font-jua text-[18px] ${
              email
                ? "text-[#265CAC] border-[#265CAC] border-[2px] text-[16px] font-ibm font-bold"
                : "text-gray-400"
            }`
          )}
        />

        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          className={twMerge(
            `w-full h-[40px] py-auto pl-[15px] border rounded-[10px] mb-[10px] font-jua text-[18px] ${
              password
                ? "text-[#265CAC] border-[#265CAC] border-[2px] text-[16px]"
                : "text-gray-400"
            }`
          )}
        />

        {/* 비밀번호 확인 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={twMerge(
            `w-full h-[40px] py-auto pl-[15px] border rounded-[10px] mb-[10px] font-jua text-[18px] ${
              confirmPassword
                ? "text-[#265CAC] border-[#265CAC] border-[2px]"
                : "text-gray-400"
            }`
          )}
        />

        {/* 에러 메시지 */}
        {error && (
          <p className="ml-[15px] text-red-500 text-[13px] font-dohyeon">
            {error}
          </p>
        )}

        {/* 로그인으로 이동하는 링크 */}
        <p
          className={twMerge(
            `text-center text-[#265CAC] font-dohyeon text-[13px] ${
              error ? "mt-[10px]" : "mt-[29.5px]"
            }`
          )}
        >
          이미 계정이 있으신가요?{" "}
          <Link
            to="/login"
            className="text-[#265CAC] text-[16px] font-bold underline"
          >
            로그인
          </Link>
        </p>

        {/* 가입하기 버튼 */}
        <button
          type="submit"
          className={twMerge(
            `w-full bg-[#265CAC] text-white py-[5px] text-[15px] rounded-[20px] mt-[10px] font-jua ${
              isFormValid ? "" : "bg-[#BABABA] cursor-not-allowed"
            }`
          )}
          disabled={!isFormValid}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
