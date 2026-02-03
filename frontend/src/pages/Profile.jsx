export default function Profile() {
  const email = localStorage.getItem("email");

  // name nikaalna email se
  const name = email ? email.split("@")[0] : "User";

  return (
    <div className="page">
      <h2>Welcome {name}</h2>
      <p>Email: {email}</p>
      <footer>© 2026 Dashboard. All Rights Reserved.</footer>
    </div>
  );
}
