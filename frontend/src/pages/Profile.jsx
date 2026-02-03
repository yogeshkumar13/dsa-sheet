import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { email } = useContext(UserContext);

  return (
    <div className="page">
      <h2>Welcome User</h2>
      <p>Email: {email}</p>
      <footer>© 2026 Dashboard. All Rights Reserved.</footer>
    </div>
  );
}