import { useNavigate } from "react-router-dom";
import { FaQrcode, FaSignOutAlt } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    alert("Logged out successfully!");

    // Redirect to Login page
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <FaQrcode size={28} />
        <h2>QR Generator</h2>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt style={{ marginRight: "8px" }} />
        Logout
      </button>
    </nav>
  );
}

export default Navbar;