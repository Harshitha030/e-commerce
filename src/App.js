import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WishlistProvider from "./WishlistContext";
import AddressProvider from "./AddressContext";   // ⭐ NEW (for navbar address)

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Wishlist from "./pages/Wishlist";
import CODConfirmation from "./pages/CODConfirmation";
import Orders from "./pages/Orders";

function App() {
  return (
    <WishlistProvider>
      <AddressProvider>   {/* ⭐ Wrap app with Address Provider */}
        <BrowserRouter>

          {/* ================= NAVBAR ================= */}
          <Navbar />

          {/* ================= TOAST ================= */}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            pauseOnHover
            theme="dark"
          />

          {/* ================= ROUTES ================= */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cod-confirmation" element={<CODConfirmation />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>

          {/* ================= FOOTER ================= */}
          <Footer />

        </BrowserRouter>
      </AddressProvider>
    </WishlistProvider>
  );
}

export default App;