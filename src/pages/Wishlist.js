import { useContext } from "react";
import { WishlistContext } from "../WishlistContext";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold"> My Wishlist</h2>

      {wishlist.length === 0 && <h4>No items in wishlist</h4>}

      <div className="row">
        {wishlist.map((item) => (
          <div className="col-md-3 col-sm-6 mb-4" key={item._id}>
            <div className="card p-2 shadow-sm">
              <img
                src={item.image}
                alt=""
                className="card-img-top"
                style={{
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h5 className="mt-2">{item.name}</h5>
              <p className="fw-bold">₹ {item.price}</p>

              <button
                className="btn btn-danger w-100"
                onClick={() => {
                  removeFromWishlist(item._id);
                  toast.error("Removed from wishlist");
                }}
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
