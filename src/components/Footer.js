import "../index.css";

export default function Footer() {
  return (
    <footer className="footer text-light mt-5">
      <div className="container py-5">

        <div className="row">

          {/* 🛍 BRAND */}
          <div className="col-md-4 mb-3">
            <h3 className="fw-bold mb-3">🛍 MyShop</h3>
            <p>
              India’s fastest-growing shopping platform.  
              Trendy products. Best prices. Fast delivery. 🚀
            </p>
          </div>

          {/* 📦 Categories */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3">Popular Categories</h5>
            <ul className="footer-links">
              <li>Fashion</li>
              <li>Electronics</li>
              <li>Beauty & Personal Care</li>
              <li>Home Essentials</li>
              <li>Sports & Fitness</li>
              <li>Gadgets & Accessories</li>
            </ul>
          </div>

          {/* 📞 Contact */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p>📍 Hyderabad, India</p>
            <p>📧 support@myshop.com</p>
            <p>📞 +91 98765 43210</p>

            <div className="social-icons mt-3">
              <span>🌐</span>
              <span>📘</span>
              <span>📸</span>
              <span>🐦</span>
            </div>
          </div>
        </div>

        <hr className="footer-line" />

        <p className="text-center m-0">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
