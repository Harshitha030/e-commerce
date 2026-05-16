import { useEffect, useState } from "react";
import "../index.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.reverse()); // latest first
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">📦 Your Orders</h2>

      {orders.length === 0 && (
        <h4 className="text-muted text-center mt-5">
          You have no orders yet.
        </h4>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          className="checkout-card p-4 mb-4 shadow-sm"
          style={{ borderLeft: "5px solid #ff7e5f" }}
        >
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">Order #{order.id}</h5>
            <span className="text-muted">{order.date}</span>
          </div>

          <p className="text-muted">
            Payment: <strong>{order.paymentType}</strong> <br />
            Status: <strong>{order.status}</strong>
          </p>

          {/* Address */}
          <div className="mt-3">
            <h6 className="fw-bold">Address:</h6>
            <p className="text-muted">{order.address.fullAddress}</p>
          </div>

          {/* Items */}
          <h6 className="fw-bold mt-3">Items:</h6>
          {order.items.map((item, i) => (
            <div key={i} className="d-flex justify-content-between">
              <span>{item.name}</span>
              <span>₹ {item.price}</span>
            </div>
          ))}

          <hr />

          <div className="d-flex justify-content-between fs-5 fw-bold">
            <span>Total</span>
            <span>₹ {order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
