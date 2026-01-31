import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // auth clear
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // redirect to login
        navigate("/", { replace: true });
    };
    return (
        <div className="navbar">
            <h3>Dashboard</h3>
            <div className="nav-links">
                <Link to="/profile">Profile</Link>
                <Link to="/topics">Topics</Link>
                {/* <Link to="/progress">Progress</Link> */}
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
