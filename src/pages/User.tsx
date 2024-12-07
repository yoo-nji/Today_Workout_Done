import { useParams } from "react-router";

export default function User() {
  const { user_id } = useParams();
  return <div>User {user_id}</div>;
}
