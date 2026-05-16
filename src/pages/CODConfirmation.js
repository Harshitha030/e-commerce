import { Link } from "react-router-dom";
import "../index.css";

export default function CODConfirmation() {
  return (
    <div className="cod-container">

      <div className="cod-card">

        {/* Success Checkmark */}
        <div className="cod-checkmark">
          ✔
        </div>

        <h2 className="cod-title">Order Placed Successfully!</h2>

        <p className="cod-subtitle">
          Your Cash on Delivery order has been confirmed.
        </p>

        {/* Order Details */}
        <div className="cod-details">
          <p><strong>Payment Mode:</strong> Cash on Delivery</p>
          <p><strong>Delivery:</strong> Expected in 3 – 5 days</p>
        </div>

        {/* Buttons */}
        <div className="cod-buttons mt-4">
          <Link to="/" className="btn cod-home-btn">
            Continue Shopping 🛒
          </Link>

          <Link to="/orders" className="btn cod-order-btn">
            View Orders 📦
          </Link>
        </div>

      </div>
    </div>
  );
}
