export default function ProductCard({ item, onAddToCart }) {
  const API_URL = "http://127.0.0.1:8000";

  return (
    <div className="product-card">
      <img
        src={`${API_URL}${item.img}`}
        alt={item.title}
        className="product-img"
      />

      <div className="product-body">
        <h3 className="product-title">{item.title}</h3>

        <div>
          <p className="product-price">
            {(parseInt(item.price_non_members) * 1000).toLocaleString()} LBP
          </p>

          <p className="product-price-members">
            {(parseInt(item.price_members) * 1000).toLocaleString()} LBP
          </p>
        </div>

        <button
          className="btn-add"
          onClick={() => onAddToCart(item)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
