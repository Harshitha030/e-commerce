export default function Cancel() {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 text-center" style={{ width: "400px" }}>
        <h2>❌ Payment Failed</h2>
        <p>Try again later!</p>
        <button className="btn btn-dark mt-3" onClick={() => window.location.href = "/cart"}>
          Back to Cart
        </button>
      </div>
    </div>
  );
}
