import { useNavigate } from "react-router";
import defaultUser from "../../assets/defaultUser.svg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="h-[70px] flex items-center justify-end px-[36px] py-[8px] border-b-2 border-solid border-[#C2C2C2]">
      {/* 로고 */}
      {/* <div className="w-[100px] h-[55px] text-center cursor-default flex flex-col justify-center items-center bg-white">
        <h1 className="text-[#265CAC] text-[20px] font-bold">
          <span className="text-[#AC265C] font-extrabold text-[30px]">!0</span>
          운완?
        </h1>
        <p className="text-[#265CAC] text-[20px] font-bold mt-[-10px] mb-[5px]">
          0운완
        </p>
      </div> */}
      {/* 오른쪽 */}
      <div className="flex gap-[10px] items-center">
        <div
          className="w-[120px] h-[36px] rounded-[10px] bg-[#265CAC]
          text-white flex justify-center 
          items-center cursor-pointer font-bold"
          onClick={() => navigate("/login")}
        >
          로그인
        </div>
        <div
          className="w-[120px] h-[36px] rounded-[10px] bg-white 
        text-[#265CAC] flex justify-center items-center 
          border-solid border border-[#265CAC] cursor-pointer font-bold"
          onClick={() => navigate("/signup")}
        >
          가입하기
        </div>

        {/*  유저 프로필 */}
        <div className="bg-white w-[48px] h-[48px] ml-[10px] flex justify-center items-center rounded-[50%] shadow-inner cursor-pointer">
          <img
            src={defaultUser}
            alt="기본 유저사진"
            className="w-[33px] h-[33px]"
          />
        </div>
      </div>
    </header>
  );
}
