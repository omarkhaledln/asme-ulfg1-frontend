import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../lib/api";
import "../styles/products.css";

export default function ProductsPage({ onAddToCart, cart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("none");

  const fetchedRef = useRef(false);
  const cartCount = cart?.reduce((sum, item) => sum + item.qty, 0) || 0;

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    setLoading(true);

    fetchProducts()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const query = q.trim().toLowerCase();

  let filtered = Array.isArray(items) ? items : [];
  if (query) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }

  let visibleItems = [...filtered];
  if (sort === "price-asc") {
    visibleItems.sort(
      (a, b) => Number(a.price_non_members) - Number(b.price_non_members)
    );
  } else if (sort === "price-desc") {
    visibleItems.sort(
      (a, b) => Number(b.price_non_members) - Number(a.price_non_members)
    );
  }

  return (
    <section className="products-page">
      {/* HERO */}
      {/* <div className="products-hero">
        <h1 className="products-hero-title">ASME Store</h1>
        <p className="products-hero-text">
          Official ASME merchandise and educational materials.  
          Support your chapter while investing in quality items designed for
          engineering students.
        </p>
      </div> */}

      {/* HIGHLIGHTS */}
      {/* <div className="products-highlights">
        <div className="highlight-card">
          <h3>Official Merchandise</h3>
          <p>Authentic ASME items approved for student chapters.</p>
        </div>

        <div className="highlight-card">
          <h3>Student-Friendly Pricing</h3>
          <p>Discounted prices for members and affordable options for all.</p>
        </div>

        <div className="highlight-card">
          <h3>Support Your Chapter</h3>
          <p>All purchases directly fund ASME student activities.</p>
        </div>
      </div> */}

      {/* HEADER */}
      <div className="products-header">
        <h2 className="products-title">Products</h2>

        <NavLink to="/cart" className="cart-link">
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
      </div>

      {/* CONTROLS */}
      <div className="products-controls">
        <input
          className="products-input"
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="products-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="none">None</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      {loading ? (
        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="product-card skeleton" />
          ))}
        </div>
      ) : visibleItems.length ? (
        <div className="products-grid">
          {visibleItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <p className="muted">No products found.</p>
      )}
    </section>
  );
}
