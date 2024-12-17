import ErrorImg from "../assets/ErrorImg.svg";
import Header from "../components/rootlayout/Header";

export default function Error() {
  return (
    <div className="flex flex-col h-screen ">
      <Header logo />
      <div className="flex flex-grow items-center justify-center bg-[#F2F3F4]">
        <div className="text-center ">
          <h1 className="text-6xl font-bold text-[#265CAC] font-jalnan">404</h1>
          <h1 className="text-4xl font-bold mt-4 text-[#265CAC] font-jalnan">
            죄송합니다
          </h1>
          <p className="text-xl font-medium mt-6 [#272727] font-jalnan">
            요청하신 정보가 변경되거나 삭제되어
          </p>
          <p className="text-xl font-medium mt-4 [#272727] font-jalnan">
            정해진 루틴대로 운동을 하지 못하고 있습니다...
          </p>
          <div className="flex h-[300px] justify-center mt-4">
            <img src={ErrorImg} alt="Error image" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
