import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { CartContext } from "../CartContext";
import { WishlistContext } from "../WishlistContext";
import { AddressContext } from "../AddressContext";
import "../index.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const { updateCartCount } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { address } = useContext(AddressContext);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);

      setTimeout(() => setLoading(false), 800);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add to cart
  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ ...item, qty: 1 }); // ⭐ ensures quantity always exists

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    toast.success("🛒 Added to cart!", {
      position: "top-right",
      autoClose: 1100,
    });
  };

  const openModal = (item) => {
    setSelected(item);
    setShow(true);
  };

  // Shimmer loader
  const ShimmerCard = () => (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="shimmer-card">
        <div className="shimmer shimmer-img"></div>
        <div className="shimmer shimmer-title"></div>
        <div className="shimmer shimmer-price"></div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">

      {/* 📍 Location banner */}
      <div className="location-banner mb-4">
        Delivering to: <strong>{address}</strong>
      </div>

      <h2 className="text-white fw-bold mb-4">🛒 Shop by Category</h2>

      {/* ================= CATEGORY NAV BAR ================= */}
<div className="category-navbar">

  <div className="category-item">
    Mobiles <span>▾</span>
    <div className="category-dropdown">
      <p>Smartphones</p>
      <p>5G Phones</p>
      <p>Accessories</p>
    </div>
  </div>

  <div className="category-item">
    Laptops & Tablets <span>▾</span>
    <div className="category-dropdown">
      <p>Laptops</p>
      <p>iPads</p>
      <p>Android Tablets</p>
    </div>
  </div>

  <div className="category-item">
    Televisions <span>▾</span>
    <div className="category-dropdown">
      <p>Smart TVs</p>
      <p>LED TVs</p>
      <p>4K TVs</p>
    </div>
  </div>

  <div className="category-item">
    Home Appliances <span>▾</span>
    <div className="category-dropdown">
      <p>Washing Machines</p>
      <p>Refrigerators</p>
      <p>ACs</p>
    </div>
  </div>

  <div className="category-item">
    Kitchen Appliances <span>▾</span>
    <div className="category-dropdown">
      <p>Microwave</p>
      <p>Mixer Grinder</p>
      <p>Cooktops</p>
    </div>
  </div>

  <div className="category-item">
    Audio & Video <span>▾</span>
    <div className="category-dropdown">
      <p>Headphones</p>
      <p>Speakers</p>
      <p>Soundbars</p>
    </div>
  </div>

  <div className="category-item">
    Personal Care <span>▾</span>
    <div className="category-dropdown">
      <p>Trimmers</p>
      <p>Hair Dryers</p>
      <p>Grooming</p>
    </div>
  </div>

</div>


      <div className="row">

        {loading &&
          Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)}

        {!loading &&
          products.map((item) => (
            <div className="col-md-3 col-sm-6 mb-4" key={item._id}>
              <div
                className="product-card shadow-sm"
                onClick={() => openModal(item)}
                style={{ position: "relative" }}
              >
                <button
                  className="wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(item);
                    toast.success("Added to wishlist!");
                  }}
                >
                  <span className="material-icons">favorite</span>
                </button>

                <div className="product-img-container">
                  <img
                    src={item.image}
                    alt="product"
                    className="img-fluid product-img"
                  />
                </div>

                <div className="product-info">
                  <h5 className="fw-bold">{item.name}</h5>

                  <div className="d-flex justify-content-between">
                    <span className="price-tag">₹ {item.price}</span>
                    <span className="rating">⭐ 4.5</span>
                  </div>

                  <button
                    className="btn add-btn w-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                  >
                    <span className="material-icons" style={{ fontSize: "15px" }}>
                      shopping_cart
                    </span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* PRODUCT MODAL */}
      {selected && (
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selected.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center">
            <img
              src={selected.image}
              alt="product"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h3 className="mt-3">₹ {selected.price}</h3>
            <p className="text-muted">
              Premium quality, fast delivery guaranteed! 🚀
            </p>
          </Modal.Body>

          <Modal.Footer>

            {/* ❤️ Wishlist inside modal */}
            <Button
              variant="warning"
              onClick={() => {
                addToWishlist(selected);
                toast.success("Added to wishlist!");
              }}
            >
              <span className="material-icons">favorite</span>
            </Button>

            {/* 🛒 Add to cart */}
            <Button
              variant="success"
              onClick={() => {
                addToCart(selected);
                setShow(false);
              }}
            >
              Add to Cart 🛒
            </Button>

            {/* ⚡ BUY NOW BUTTON */}
            <Button
              variant="primary"
              onClick={() => {
                localStorage.setItem("buyNowItem", JSON.stringify(selected));
                window.location.href = "/checkout?buyNow=true";
              }}
            >
              Buy Now ⚡
            </Button>

            {/* Close */}
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
