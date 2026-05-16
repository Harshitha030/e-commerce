import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      // ✅ Save data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("isLoggedIn", "true");

      // ✅ IMPORTANT: save user
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name || email,
          email: res.data.email || email,
        })
      );

      toast.success("Login Successful 🎉");

      // ✅ reload to update navbar
      window.location.href = "/";

    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async (googleResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/google-login",
        { token: googleResponse.credential }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("isLoggedIn", "true");

      // ✅ save user
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name || "Google User",
          email: res.data.email || "",
        })
      );

      toast.success("Google Login Successful 🎉");

      window.location.href = "/";

    } catch (error) {
      console.log(error);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Login</h2>

        {/* EMAIL */}
        <input
          type="email"
          className="form-control auth-input"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control auth-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        {/* GOOGLE LOGIN */}
        <div className="mt-3 d-flex justify-content-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>

        {/* REGISTER */}
        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}