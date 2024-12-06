import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function Home() {
  return (
    <>
      <div className="gap-4 m-4 space-x-4">
        <SignUp />
        <Login />
      </div>
    </>
  );
}
