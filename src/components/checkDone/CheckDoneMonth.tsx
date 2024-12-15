import { useAuth } from "../../stores/authStore";

interface CheckDoneMonthType {
  checkNumber: number;
  width?: string;
  textSize?: string;
}

export default function CheckDoneMonth({
  checkNumber,
  width,
  textSize,
}: CheckDoneMonthType) {
  const myInfo = useAuth((state) => state.user);

  const date = new Date();
  return (
    <div className={`${textSize ? textSize : "text-[16px]"}`}>
      <p className={`${textSize ? textSize : "text-[18px]"} font-bold`}>
        {myInfo?.fullName}님
      </p>
      <p
        className={`text-[#265CAC] ${
          textSize ? textSize : "text-[22px]"
        } font-extrabold`}
      >
        {date.getMonth() + 1}월달에 총 {checkNumber}회
      </p>
      인증하셨네요
    </div>
  );
}
