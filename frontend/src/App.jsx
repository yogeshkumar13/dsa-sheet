import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Topics from "./pages/Topics";
// import Progress from "./pages/Progress";
import Navbar from "./components/Navbar";

function AppRoutes() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  // 👇 Login page par navbar hide
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/topics" element={<Topics />} />
        {/* <Route path="/progress" element={<Progress />} /> */}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
