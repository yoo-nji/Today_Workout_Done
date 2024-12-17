import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function BmiCon() {
  const [kg, setKg] = useState<string>("");
  const [cm, setCm] = useState<string>("");
  const bmiRef = useRef<HTMLSpanElement>(null);
  const [bmiStatus, setBmiStatus] = useState("");

  // BMI 계산 함수
  const calcBmi = (kg: number, cm: number) => {
    const bmi = Number((kg / (cm / 100) ** 2).toFixed(1));
    let message = "";
    // 결과
    if (bmi < 18.5) {
      message = "저체중";
      setBmiStatus("저체중");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      message = "정상";
      setBmiStatus("정상");
    } else if (bmi >= 25.0 && bmi < 29.9) {
      message = "과체중";
      setBmiStatus("과체중");
    } else if (bmi >= 30.0) {
      message = "비만";
      setBmiStatus("비만");
    }

    bmiRef.current!.innerText = message;
  };

  const handleKgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setKg(value);
    }
  };

  const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setCm(value);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-[#f7faff] items-center py-20">
        <h2 className="font-jalnan text-xl font-semibold mb-6">
          👀 BMI 계산기
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex lg:gap-2 lg:flex-row flex-col items-center gap-3"
        >
          <input
            placeholder="몸무게(kg)"
            className="flex-1 border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-[#e7effa] "
            value={kg}
            onChange={handleKgChange}
          />
          <input
            placeholder="신장(cm)"
            className="flex-1 border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-[#e7effa]"
            value={cm}
            onChange={handleCmChange}
          />
          <button
            onClick={() => {
              if (kg && cm) calcBmi(Number(kg), Number(cm));
            }}
            className="lg:w-[80px] w-full bg-[#265cac] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#1e4d8a] transition"
          >
            결과
          </button>
          <button
            onClick={() => {
              setKg("");
              setCm("");
              setBmiStatus("");
              bmiRef.current!.innerText = "--";
            }}
            className="lg:w-[80px] w-full border border-[#265cac] bg-white text-[#265cac]  font-semibold py-2 px-4 rounded-lg hover:bg-[#f2f2f2] transition"
          >
            초기화
          </button>
        </form>
        <div className="flex gap-2 mt-8 text-lg font-semibold text-gray-600">
          <span className="text-lg font-semibold text-gray-600">
            당신의 BMI는
          </span>
          <span
            ref={bmiRef}
            className={twMerge(
              "text-xl font-bold text-[#265cac]",
              bmiStatus === "저체중" && "text-blue-500",
              bmiStatus === "정상" && "text-green-500",
              bmiStatus === "과체중" && "text-yellow-500",
              bmiStatus === "비만" && "text-red-500"
            )}
          >
            --
          </span>
          <span> 입니다</span>
        </div>
      </div>
    </>
  );
}
