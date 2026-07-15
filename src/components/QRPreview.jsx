function QRPreview({ image }) {
  if (!image) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Your QR Code</h3>

      <img
        src={`http://127.0.0.1:8000${image}`}
        alt="QR Code"
        style={{
          width: "250px",
          height: "250px",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "10px",
          background: "#fff",
        }}
      />
    </div>
  );
}

export default QRPreview;