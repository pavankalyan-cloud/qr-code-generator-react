import { useState } from "react";
import API from "../services/api";
import QRPreview from "./QRPreview";

function QRForm() {
  const [text, setText] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("Please enter URL or Text");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("generate/", {
        data: text, // Matches your Django view
      });

      console.log(response.data);

      // Your serializer returns "image"
      setQrImage(response.data.image);

    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to generate QR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter URL or Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "#4facfe",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate QR"}
      </button>

      <br />
      <br />

      {qrImage && <QRPreview image={qrImage} />}
    </>
  );
}

export default QRForm;