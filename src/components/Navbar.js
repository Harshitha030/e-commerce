import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import { WishlistContext } from "../WishlistContext";
import { AddressContext } from "../AddressContext";
import AddressModal from "./AddressModal";
import { MdLocationOn } from "react-icons/md";

export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { address } = useContext(AddressContext);

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // ✅ Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "linear-gradient(90deg,#ff9966,#ff5e62)",
          padding: "12px",
        }}
      >
        <div className="container-fluid">

          {/* BRAND */}
          <Link className="navbar-brand text-white fw-bold fs-4" to="/">
            🛍 MyShop
          </Link>

          <div className="d-flex align-items-center">

            {/* LOCATION */}
            <button
              className="btn btn-light mx-2 d-flex align-items-center"
              onClick={() => setShowModal(true)}
            >
              <MdLocationOn size={20} className="me-2 text-danger" />
              {address || "Select Address"}
            </button>

            {/* WISHLIST */}
            <Link className="btn btn-light mx-2" to="/wishlist">
              ❤️ Wishlist ({wishlist.length})
            </Link>

            {/* CART */}
            <Link className="btn btn-light mx-2" to="/cart">
              🛒 Cart ({cartCount})
            </Link>

            {/* USER / LOGIN */}
            {user ? (
              <>
                <div className="btn btn-light mx-2">
                  👤 {user.name}
                </div>

                <button
                  className="btn btn-dark mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-light mx-2" to="/login">
                Login
              </Link>
            )}

          </div>
        </div>
      </nav>

      {/* ADDRESS MODAL */}
      <AddressModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}