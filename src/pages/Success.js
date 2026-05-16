export default function Success() {
  localStorage.removeItem("cart");

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 text-center" style={{ width: "400px" }}>
        <h2>🎉 Payment Successful!</h2>
        <p>Your order is confirmed.</p>
        <button className="btn btn-primary mt-3" onClick={() => window.location.href = "/"}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
