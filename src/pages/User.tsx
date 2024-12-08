import { useParams } from "react-router";
import UserCard from "../components/User/UserCard";

export default function User() {
  const { user_id } = useParams();
  return (
    <>
      <div>User {user_id}</div>
      <UserCard />
    </>
  );
}
