import { FaDownload, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/QRHistory.css";

function QRHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await API.get("history/");

      if (response.data.results) {
        setHistory(response.data.results);
      } else {
        setHistory(response.data);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteQR = async (id) => {
    try {
      await API.delete(`delete/${id}/`);
      alert("✅ QR Code Deleted Successfully");
      fetchHistory();
    } catch (error) {
      console.log(error.response?.data);
      alert("❌ Failed to delete QR Code");
    }
  };

  const downloadQR = async (id) => {
    try {
      const response = await API.get(`download/${id}/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = `qr_${id}.png`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.response?.data);
      alert("❌ Download Failed");
    }
  };

  return (
    <div className="history-container">
      <h2>QR History</h2>

      {history.length === 0 ? (
        <p className="empty-history">
          No QR Codes Generated Yet.
        </p>
      ) : (
        history.map((item) => (
          <div key={item.id} className="history-card">

            <p className="history-text">
              <strong>Text:</strong> {item.data}
            </p>

            <img
              src={`http://127.0.0.1:8000${item.image}`}
              alt="QR Code"
              className="history-image"
            />

            <div className="history-buttons">

              <button
                className="download-btn"
                onClick={() => downloadQR(item.id)}
              >
                <FaDownload />
                <span>Download QR</span>
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteQR(item.id)}
              >
                <FaTrash />
                <span>Delete</span>
              </button>

            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default QRHistory;