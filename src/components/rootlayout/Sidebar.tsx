export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col">
        <button className="w-10">
          <img src="/src/assets/double-left.svg" alt="" />
        </button>
        {/* 로고 */}
        <a className="w-20 h-[53px]" href="/">
          <img src="/src/assets/loge.svg" alt="loge" />
        </a>
        {/* 멘트 */}
        <div>
          <div>
            어서오세요 <span>수영</span>님
          </div>
          <div>오늘도 운동 완료하셨나요?</div>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </>
  );
}
