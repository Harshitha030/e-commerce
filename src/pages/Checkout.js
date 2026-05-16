import { useState, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { loadStripe } from "@stripe/stripe-js";
import "../index.css";

const stripePromise = loadStripe("your_publishable_key_here");

const containerStyle = {
  width: "100%",
  height: "350px",
};

const defaultCenter = {
  lat: 17.385044,
  lng: 78.486671,
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const isBuyNow = searchParams.get("buyNow") === "true";

  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [addressInfo, setAddressInfo] = useState({});
  const mapRef = useRef(null);

  const [manual, setManual] = useState({
    name: "",
    phone: "",
    fullAddress: "",
  });

  const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const cart = isBuyNow
    ? buyNowItem
      ? [{ ...buyNowItem, qty: buyNowItem.qty || 1 }]
      : []
    : storedCart;

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const handleManualChange = (e) => {
    setManual({ ...manual, [e.target.name]: e.target.value });
  };

  // 📍 MAP CLICK
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const newLocation = { lat, lng };
    setSelectedLocation(newLocation);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${lat},${lng}`,
            key: "YOUR_GOOGLE_MAPS_API_KEY",
          },
        }
      );

      const result = response.data.results[0];

      if (result) {
        setAddressInfo({
          address: result.formatted_address,
        });
      }
    } catch (error) {
      console.error("Geocode error:", error);
    }
  };

  // ✅ VALIDATION
  const validateAddress = () => {
    const finalAddress = {
      name: manual.name,
      phone: manual.phone,
      fullAddress: manual.fullAddress || addressInfo.address,
    };

    if (!finalAddress.name || !finalAddress.phone || !finalAddress.fullAddress) {
      toast.error("Please fill all required fields");
      return null;
    }

    return finalAddress;
  };

  // 💾 SAVE ORDER (LOCAL)
  const saveOrder = (finalAddress, paymentType) => {
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push({
      id: Date.now(),
      items: cart,
      total,
      address: finalAddress,
      paymentType,
      status: "Order Placed",
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("orders", JSON.stringify(existingOrders));
  };

  // 💵 COD
  const handleCOD = () => {
    const finalAddress = validateAddress();
    if (!finalAddress) return;

    saveOrder(finalAddress, "COD");

    if (isBuyNow) {
      localStorage.removeItem("buyNowItem");
    } else {
      localStorage.removeItem("cart");
    }

    toast.success("Order placed successfully!");
    window.location.href = "/cod-confirmation";
  };

  // 💳 STRIPE PAYMENT
  const handleOnlinePayment = async () => {
    const finalAddress = validateAddress();
    if (!finalAddress) return;

    try {
      const stripe = await stripePromise;

      const res = await fetch(
        "http://localhost:5000/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        }
      );

      const data = await res.json();

      // redirect to Stripe
      window.location.href = data.url;

    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">🛍 Checkout</h2>

      <div className="row">

        {/* LEFT */}
        <div className="col-md-7">

          <div className="checkout-card p-4 mb-4">
            <h4>📦 Delivery Address</h4>

            <input
              name="name"
              className="form-control mb-3"
              placeholder="Full Name"
              value={manual.name}
              onChange={handleManualChange}
            />

            <input
              name="phone"
              className="form-control mb-3"
              placeholder="Phone"
              value={manual.phone}
              onChange={handleManualChange}
            />

            <textarea
              name="fullAddress"
              className="form-control mb-3"
              placeholder="Full Address"
              value={manual.fullAddress || addressInfo.address || ""}
              onChange={handleManualChange}
            />
          </div>

          {/* MAP */}
          <div className="checkout-card p-4 mb-4">
            <h4>📍 Select Location on Map</h4>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={selectedLocation}
              zoom={14}
              onClick={handleMapClick}
              onLoad={(map) => (mapRef.current = map)}
            >
              <Marker position={selectedLocation} />
            </GoogleMap>
          </div>

        </div>

        {/* RIGHT */}
        <div className="col-md-5">
          <div className="checkout-card p-4">

            <h4>🧾 Order Summary</h4>

            {cart.map((item, i) => (
              <div key={i} className="d-flex justify-content-between">
                <span>{item.name}</span>
                <span>₹ {item.price}</span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            {/* COD */}
            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleCOD}
            >
              Cash on Delivery (COD)
            </button>

            {/* ONLINE PAYMENT */}
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleOnlinePayment}
            >
              Pay Online 💳
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}