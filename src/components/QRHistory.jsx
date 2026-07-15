import { FaDownload, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../services/api";

function QRHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await API.get("history/");

      console.log("History Response:", response.data);

      // Handle paginated and non-paginated responses
      if (response.data.results) {
        setHistory(response.data.results);
      } else {
        setHistory(response.data);
      }
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Headers:", error.config?.headers);
    }
  };

  const deleteQR = async (id) => {
    try {
      await API.delete(`delete/${id}/`);
      alert("QR Code Deleted Successfully");
      fetchHistory();
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to delete QR Code");
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
      alert("Download Failed");
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>QR History</h2>

      {history.length === 0 ? (
        <p>No QR Codes Generated Yet</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Text:</strong> {item.data}
            </p>

            <img
              src={`http://127.0.0.1:8000${item.image}`}
              alt="QR Code"
              width="140"
            />

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => downloadQR(item.id)}
                style={{ marginRight: "10px" }}
              >
                Download
              </button>

              <button onClick={() => deleteQR(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QRHistory;