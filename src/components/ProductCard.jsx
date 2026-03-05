const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_BASE = API_URL.replace("/api", "");

export default function ProductCard({ item, onAddToCart }) {
  function handleAdd() {
    onAddToCart(item);
  }

  return (
    <div className="product-card">
      {/* ── PHOTO ── */}
      {item.img ? (
        <img
          src={`${API_BASE}${item.img}`}
          alt={item.title}
          className="product-img"
        />
      ) : (
        <div className="product-img-placeholder">
          <span style={{ position: "relative", zIndex: 2 }}>🔩</span>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="product-body">
        <h3 className="product-title">{item.title}</h3>

        {/* Pricing block */}
        <div className="product-pricing">
          {/* Non-member price */}
          <div className="price-row">
            <span className="price-label nonmember">Non-Member</span>
            <span className="product-price">
              {(Number(item.price_non_members) * 1000).toLocaleString()} LBP
            </span>
          </div>

          {/* Member price */}
          <div className="price-row">
            <span className="price-label member">Member Price</span>
            <span className="product-price-members">
              {(Number(item.price_members) * 1000).toLocaleString()} LBP
            </span>
          </div>
        </div>

        {/* Add to cart */}
        <button className="btn-add" onClick={handleAdd}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}