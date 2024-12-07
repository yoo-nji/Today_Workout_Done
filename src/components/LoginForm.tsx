export default function LoginForm() {
  return (
    <>
      <form
        action=""
        className=" flex flex-col items-center w-150 h-[730px]m-[50px, 35px] bg-[#FFFFFF]"
      >
        <div className="mb-[35px]">
          <h1 className="text-[#265CAC] text-[20px] font-bold">
            <span className="text-[#AC265C] font-extrabold text-[30px]">
              !0
            </span>
            운완?
          </h1>
          <p className="text-center text-[#265CAC] text-[20px] font-bold mt-[-10px] mb-[5px]">
            0운완
          </p>
        </div>
        <h2 className=" font-bold mb-[47px]">로그인</h2>
        <input
          type="text"
          placeholder="아이디"
          required
          className="w-[530px] h-14 border border-[#C2C2C2] rounded-[10px] placeholder-[#B6B6B6] mb-[35px]"
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          className="w-[530px] h-14 border border-[#C2C2C2] rounded-[10px] placeholder-[#B6B6B6] mb-[28px]"
        />

        <button className="w-[530px] h-[50px] rounded-[20px] bg-[#BABABA] font-bold text-[#FFFFFF] mb-4">
          로그인
        </button>
        <button className="w-[530px] h-[50px] rounded-[20px] bg-[#3B6CB4] font-bold text-[#FFFFFF] mb-6">
          가입하기
        </button>
        <hr className="w-[530px] mb-10" />
        <a href="#" className="font-bold text-[#3B6CB4] mb-3">
          저희 서비스가 궁금하신가요?
        </a>
        <button className="w-[530px] h-[50px] border-2 border-[#3B6CB4]  rounded-[20px] bg-[#FFFFFF] text-[#212121]">
          비회원으로 둘러보기
        </button>
      </form>
    </>
  );
}
