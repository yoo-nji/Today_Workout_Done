import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface DoneProgressBar {
  checkNumber: number;
  width?: string;
}

export default function DoneProgressBar({
  checkNumber,
  width,
}: DoneProgressBar) {
  const date = new Date();

  const setDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // 해당 월의 마지막 날짜
  const lastDate = setDate.getDate();

  // 해당 월의 게시글을 작성한 평균
  const percent = (checkNumber / lastDate) * 100;

  return (
    <div className={`${width ? width : "w-[110px]"}`}>
      <CircularProgressbar
        value={percent}
        text={`${percent.toFixed(0)}%`}
        styles={{
          path: {
            stroke: `rgba(38, 92, 172, ${percent / 100})`,
            strokeLinecap: "round",
            transition: "stroke-dashoffset 0.5s ease 0s",
          },
          trail: {
            stroke: "#ececec",
          },
          text: {
            fill: "#265CAC",
          },
        }}
      />
    </div>
  );
}
