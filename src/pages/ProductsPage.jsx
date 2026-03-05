import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../lib/api";
import { ShoppingCart } from "lucide-react";

import "../styles/products.css";

export default function ProductsPage({ onAddToCart, cart }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ]             = useState("");
  const [sort, setSort]       = useState("none");
  const [cartGuardMsg, setCartGuardMsg] = useState(false);

  const fetchedRef = useRef(false);
  const cartCount  = cart?.reduce((sum, item) => sum + item.qty, 0) || 0;

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);
    fetchProducts()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  /* ── filter + sort ── */
  const query = q.trim().toLowerCase();
  let visible = Array.isArray(items) ? [...items] : [];
  if (query) {
    visible = visible.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }
  if (sort === "price-asc") {
    visible.sort((a, b) => Number(a.price_non_members) - Number(b.price_non_members));
  } else if (sort === "price-desc") {
    visible.sort((a, b) => Number(b.price_non_members) - Number(a.price_non_members));
  }

  return (
    <div className="products-page">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="products-hero">
        <div className="products-hero-bg"    />
        <div className="products-hero-grid"  />
        <div className="products-hero-overlay" />
        <div className="products-hero-deco"  aria-hidden>⚙️</div>

        <div className="products-hero-content">
          <h1 className="products-hero-title">
            Our <span>Products</span>
          </h1>
          <p className="products-hero-text">
            Browse club-exclusive merchandise, handcrafted engineering builds,
            and DIY kits — all made by our members. Member pricing available
            on every item.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════
          STICKY TOOLBAR
      ══════════════════════════════ */}
      <div className="products-toolbar">

        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon" aria-hidden>🔍</span>
          <input
            className="products-input"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="sort-wrap">
          <select
            className="products-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">Sort by Price</option>
            <option value="price-asc">Price (Ascending)</option>
            <option value="price-desc">Price (Descending)</option>
          </select>
        </div>

        {/* Cart button */}
        <div style={{ position: "relative" }}>
          {cartGuardMsg && (
            <div style={{
              position: "absolute", bottom: "calc(100% + 10px)", right: 0,
              background: "#1A1A2E", color: "white",
              padding: "10px 16px", whiteSpace: "nowrap",
              fontFamily: "'Barlow', sans-serif", fontSize: "0.78rem",
              fontWeight: 600, letterSpacing: "0.5px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              borderLeft: "3px solid #E8630A",
              zIndex: 999,
            }}>
              🛒 No items yet — add something first!
            </div>
          )}
          <NavLink
            to={cartCount > 0 ? "/cart" : "#"}
            className="cart-link"
            aria-label="My Cart"
            onClick={(e) => {
              if (cartCount === 0) {
                e.preventDefault();
                setCartGuardMsg(true);
                setTimeout(() => setCartGuardMsg(false), 3000);
              }
            }}
          >
            <ShoppingCart className="cart-icon" />
            My Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </NavLink>
        </div>

      </div>

      {/* ══════════════════════════════
          PRODUCTS SECTION
      ══════════════════════════════ */}
      <section className="products-section">

        <div className="section-header">
          <span className="section-tag" />
          <h2 className="section-title">
            All <span>Products</span>
          </h2>
          <p className="section-sub">
            Exclusively engineered and designed by ASME-ULFG1 members.
          </p>
        </div>

        {loading ? (
          /* Skeleton */
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="product-card skeleton" />
            ))}
          </div>

        ) : visible.length ? (
          /* Cards */
          <div className="products-grid">
            {visible.map((item) => (
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

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="products-cta">
        <div className="cta-content">
          <div className="cta-tag">Join The Club</div>
          <h2>Want <span>Member Pricing?</span></h2>
          <p>
            Become an ASME-ULFG1 member and unlock exclusive discounts
            on every product in the store.
          </p>
          <NavLink to="/members" className="cta-btn">
            Become a Member
          </NavLink>
        </div>
      </section>

    </div>
  );
}