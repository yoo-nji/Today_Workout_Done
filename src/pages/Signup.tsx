import { useState } from "react";
import logoImg from "../assets/loge.svg";
import "../css/index.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);

    // 비밀번호 확인이 일치하지 않으면 에러 메시지 설정
    if (e.target.value !== password) {
      setError("비밀번호가 일치하지 않음");
    } else {
      setError(""); // 비밀번호가 일치하면 에러 메시지 제거
    }
  };

  // 모든 입력 필드가 채워지고 비밀번호가 일치하는지 체크
  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    error === "";

  return (
    <div className="bg-[#FFFFFF] rounded-[45px] border-red-500 w-[600px] h-[730px] mx-auto my-auto">
      <img src={logoImg} className="pt-[50px] block mx-auto" />
      <p className="text-center text-[26px] font-pretendard font-[700] mt-[26px]">
        새로운 계정 만들기
      </p>
      <form className="px-[40px]">
        {/* 이름 입력 필드 */}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          className={`w-full h-[56px] py-[19px] pl-[24px] border border-gray-300 rounded-[10px] mt-[26px] mb-[26px] text-[26px] ${
            name ? "text-[#265CAC] font-bold" : "text-gray-400"
          }`}
        />

        {/* 이메일 주소 입력 필드 */}
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={handleEmailChange}
          className={`w-full h-[56px] py-[19px] pl-[24px] border border-gray-300 rounded-[10px] mb-[26px] text-[26px] ${
            email ? "text-[#265CAC] font-bold" : "text-gray-400"
          }`}
        />

        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          className={`w-full h-[56px] py-[19px] pl-[24px] border border-gray-300 rounded-[10px] mb-[26px] text-[26px] ${
            password ? "text-[#265CAC] font-bold" : "text-gray-400"
          }`}
        />

        {/* 비밀번호 확인 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={`w-full h-[56px] py-[19px] pl-[24px] border border-gray-300 rounded-[10px] mb-[10px] text-[26px] ${
            confirmPassword ? "text-[#265CAC] font-bold" : "text-gray-400"
          }`}
        />

        {/* 비밀번호 불일치 메시지 */}
        {error && <p className="text-red-500 font-bold text-[16px]">{error}</p>}

        {/* 로그인으로 이동하는 링크 */}
        <p
          className={`text-center text-sm ${
            error ? "mt-[42.5px]" : "mt-[66.5px]"
          }`}
        >
          이미 계정이 있으신가요?{" "}
          <Link
            to="/login"
            className="text-blue-500 text-[16px] font-bold underline"
          >
            로그인
          </Link>
        </p>

        {/* 가입하기 버튼 */}
        <button
          type="submit"
          className={`w-full bg-[#265CAC] text-white py-[12px] rounded-[20px] mt-[12px] ${
            isFormValid ? "" : "bg-[#BABABA] cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
