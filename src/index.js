import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import AddressProvider from "./AddressContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { CartProvider } from "./CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadScript } from "@react-google-maps/api";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="123230329448-gpkspellqrbrnb805e3qje39t2259nnr.apps.googleusercontent.com">
      
      <LoadScript
        googleMapsApiKey="AIzaSyAY5-zwkUQDCXnNtnlv6ZHnNi8JS8YLvbg"
        libraries={["places"]}
      >
        <AddressProvider>
        <CartProvider>
           <App />
        </CartProvider>
      </AddressProvider>
      </LoadScript>

    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();