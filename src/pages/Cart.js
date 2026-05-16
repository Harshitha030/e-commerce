import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ensure qty exists
    storedCart.forEach(item => (item.qty = item.qty || 1));

    setCart(storedCart);
  }, []);

  // Update cart everywhere
  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Increase quantity
  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty += 1;
    updateCart(updated);
  };

  // Decrease quantity
  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].qty > 1) updated[index].qty -= 1;
    updateCart(updated);
  };

  // Remove product
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mt-4 mb-5">

      {/* PAGE TITLE */}
      <h2 className="fw-bold mb-4" style={{ fontSize: "32px" }}>
        Shopping Cart
      </h2>

      <div className="row">

        {/* LEFT SIDE – PRODUCTS */}
        <div className="col-md-8">

          {cart.length === 0 && (
            <h4>Your cart is empty.</h4>
          )}

          {cart.map((item, index) => (
            <div
              key={index}
              className="p-3 mb-3 shadow-sm"
              style={{
                background: "white",
                borderRadius: "12px",
                display: "flex",
                gap: "20px",
              }}
            >
              {/* PRODUCT IMAGE */}
              <img
                src={item.image}
                alt="product"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              {/* PRODUCT INFO */}
              <div style={{ flex: 1 }}>
                <h5 className="fw-bold">{item.name}</h5>
                <p className="text-success fw-semibold">In stock</p>

                {/* ACTION BUTTONS */}
                <div className="d-flex align-items-center mt-2">

                  {/* DELETE */}
                  <span
                    className="material-icons me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeItem(index)}
                  >
                    delete
                  </span>

                  {/* QUANTITY CONTROLS */}
                  <div
                    style={{
                      border: "2px solid #f0c14b",
                      borderRadius: "20px",
                      padding: "5px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      onClick={() => decreaseQty(index)}
                    >
                      –
                    </span>

                    {item.qty}

                    <span
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      onClick={() => increaseQty(index)}
                    >
                      +
                    </span>
                  </div>

                  {/* EXTRA ACTIONS */}
                  <span className="mx-3 text-primary" style={{ cursor: "pointer" }}>
                    Save for later
                  </span>

                  <span className="text-primary" style={{ cursor: "pointer" }}>
                    Share
                  </span>

                </div>
              </div>

              {/* PRICE */}
              <div>
                <h4 className="fw-bold">₹{item.price}</h4>
              </div>
            </div>
          ))}

          {/* SUBTOTAL BELOW PRODUCTS */}
          {cart.length > 0 && (
            <h5 className="fw-bold text-end mt-3">
              Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"}): ₹{total}
            </h5>
          )}
        </div>

        {/* RIGHT SIDE – CHECKOUT BOX */}
        <div className="col-md-4">
          {cart.length > 0 && (
            <div
              className="p-3 shadow-sm"
              style={{
                background: "white",
                borderRadius: "12px",
                position: "sticky",
                top: "90px",
              }}
            >
              <h5 className="fw-bold">
                Subtotal ({cart.length} items): ₹{total}
              </h5>

              <button
                className="btn w-100 mt-3"
                style={{
                  background: "#f0c14b",
                  borderRadius: "10px",
                  padding: "10px",
                  fontWeight: "600",
                }}
                onClick={() => window.location.assign("/checkout")}
              >
                Proceed to Buy
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
