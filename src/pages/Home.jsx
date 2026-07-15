
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRForm from "../components/QRForm";
import Navbar from "../components/Navbar";
import QRHistory from "../components/QRHistory";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h1>QR Code Generator</h1>
          <p>Create QR codes instantly from text or URLs.</p>

          <QRForm />
          <QRHistory />
        </div>
      </div>
    </>
  );
}

export default Home;