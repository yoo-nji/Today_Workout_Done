import { useState } from "react";

export default function Posting() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [channel, setChannel] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="flex  justify-center items-center outline-none">
      <input type="text" placeholder="제목을 입력해주세요" className="border" />

      <textarea
        name="desc"
        id="desc"
        placeholder="내용을 작성해주세요"
        className="border resize-none outline-none"
      ></textarea>

      <select name="channel" id="channel">
        <option value="WorkoutDone">오운완 인증</option>
        <option value="Protein">프로틴 추천</option>
        <option value="Routine">루틴 공유</option>
        <option value="Gymreview">헬스장 후기</option>
      </select>

      <button>등록하기</button>
    </div>
  );
}
