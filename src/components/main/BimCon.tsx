export default function BimCon() {
  return (
    <>
      <div className="flex flex-col bg-[#f7faff] items-center py-20">
        <h2 className="font-jalnan text-xl font-semibold mb-6">
          👀 BMI 계산기
        </h2>
        <div className="flex lg:gap-2 lg:flex-row flex-col items-center gap-3">
          <input
            type="number"
            placeholder="몸무게(kg)"
            className="flex-1 border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-[#e7effa] "
          />
          <input
            type="number"
            placeholder="신장(cm)"
            className="flex-1 border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-[#e7effa]"
          />
          <button className="lg:w-[60px] w-full bg-[#265cac] text-white py-2 px-4 rounded-lg hover:bg-[#1e4d8a] transition">
            결과
          </button>
        </div>
        <div className="flex gap-2 mt-8 text-lg font-semibold text-gray-600">
          <span className="text-lg font-semibold text-gray-600">
            당신의 BMI은
          </span>
          <span className="text-xl font-bold text-[#265cac]">--</span>
          <span> 입니다</span>
        </div>
      </div>
    </>
  );
}
