import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/cart.css";

/* ===============================
   SAFE API CONFIG
================================ */
const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const API_BASE = API_URL.replace("/api", "");

export default function CartPage({ cart, onRemoveFromCart }) {
  const navigate = useNavigate();

  /* ── Redirect to products when cart becomes empty after removal ── */
  useEffect(() => {
    if (cart.length === 0) {
      // Only redirect if we've already been on the page (not on first load with empty cart)
      // We handle first-load empty state with the guard below
    }
  }, [cart]);

  /* ── All original logic — untouched ── */
  const totalMembers = cart.reduce(
    (sum, item) => sum + Number(item.price_members) * item.qty,
    0
  );

  const totalNonMembers = cart.reduce(
    (sum, item) => sum + Number(item.price_non_members) * item.qty,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const [checkout, setCheckout] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [wasPopulated, setWasPopulated] = useState(cart.length > 0);

  /* Track when cart goes from populated → empty to trigger redirect */
  useEffect(() => {
    if (cart.length > 0) {
      setWasPopulated(true);
    } else if (wasPopulated && cart.length === 0) {
      // Cart was populated and is now empty — redirect back to products
      navigate("/products");
    }
  }, [cart.length]);

  function updateField(field, value) {
    setCheckout({ ...checkout, [field]: value });
  }

  function validateCheckout() {
    if (!checkout.name.trim()) return "Please enter your name.";
    if (!checkout.email.trim()) return "Please enter your email.";
    if (!checkout.department.trim()) return "Please enter your department.";
    if (!checkout.year.trim()) return "Please enter your year.";
    if (!checkout.phone.trim()) return "Please enter your phone number.";
    if (!/^\d+$/.test(checkout.phone))
      return "Phone number must contain only numbers.";
    return "";
  }

  async function  handleCheckout() {
    setError("");
    setStatus("");

    const validationError = validateCheckout();
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("Sending…");

    try {
      const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkout,
          cart: cart.map((item) => ({
            id: item.id,
            title: item.title,
            qty: item.qty,
            price_members: item.price_members,
            price_non_members: item.price_non_members,
          })),
          total_members: totalMembers,
          total_non: totalNonMembers,
        }),
      });

      const data = await res.json();
      setStatus(
        data.success
          ? "Order sent successfully!"
          : "Failed to send order."
      );
    } catch {
      setStatus("Error sending order.");
    }
  }

  /* ══════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════ */
  return (
    <div className="cart-page">

      {/* ── PAGE HEADER BAR ── */}
      <div className="cart-page-bar">
        <div className="cart-page-bar-grid" />
        <div className="cart-page-bar-overlay" />
        <div className="cart-page-bar-content">
      
          <h1 className="cart-title">My <span>Cart</span></h1>
        </div>
        <NavLink to="/products" className="cart-page-bar-back">
          ← Back to Products
        </NavLink>
      </div>

      {/* ══ EMPTY STATE — shown when cart is empty on arrival ══ */}
      {cart.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <h2>Your Cart is <span>Empty</span></h2>
          <p>
            You haven't added any items yet.<br />
            Head back to the store and add something to see your cart details.
          </p>
          <NavLink to="/products" className="btn-back-products">
            Browse Products
          </NavLink>
        </div>

      ) : (

        /* ══ CART CONTENT ══ */
        <div className="cart-layout">

          {/* ── LEFT: ITEMS ── */}
          <div className="cart-items">

            <div className="cart-items-header">
              <div>
                <span className="cart-section-tag" />
                <div className="cart-panel-title">
                  Cart <span>Items</span>
                </div>
              </div>
              <div className="cart-item-count">
                <span>{cart.length}</span> {cart.length === 1 ? "item" : "items"} in your cart
              </div>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-card">

                <img
                  src={`${API_BASE}${item.img}`}
                  alt={item.title}
                  className="cart-card-img"
                />

                <div className="cart-card-content">
                  <div className="cart-card-header">
                    <h3>{item.title}</h3>
                    <button
                      className="cart-remove"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <div className="cart-prices">
                    <p>
                      Members price
                      <span>
                        {(item.price_members * 1000).toLocaleString()} LBP × {item.qty}
                      </span>
                    </p>
                    <p>
                      Non-members price
                      <span>
                        {(item.price_non_members * 1000).toLocaleString()} LBP × {item.qty}
                      </span>
                    </p>
                  </div>

                  <div className="cart-subtotals">
                    <p className="sub-members">
                      Members subtotal
                      <span>
                        {(item.price_members * 1000 * item.qty).toLocaleString()} LBP
                      </span>
                    </p>
                    <p className="sub-non">
                      Non-members subtotal
                      <span>
                        {(item.price_non_members * 1000 * item.qty).toLocaleString()} LBP
                      </span>
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* ── RIGHT: SUMMARY + FORM ── */}
          <aside className="cart-summary">

            <h2>Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span className="summary-count-badge">{itemCount}</span>
            </div>

            <div className="summary-row">
              <strong>Total for Members</strong>
              <strong className="summary-total-member">
                {(totalMembers * 1000).toLocaleString()} LBP
              </strong>
            </div>

            <div className="summary-row">
              <strong>Total for Non-Members</strong>
              <strong className="summary-total-non">
                {(totalNonMembers * 1000).toLocaleString()} LBP
              </strong>
            </div>

            {/* Checkout form */}
            <div className="checkout-form">
              <h3>Your Information</h3>

              <input
                placeholder="Full Name"
                value={checkout.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <input
                placeholder="Email Address"
                type="email"
                value={checkout.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <input
                placeholder="Department"
                value={checkout.department}
                onChange={(e) => updateField("department", e.target.value)}
              />
              <input
                placeholder="Year"
                value={checkout.year}
                onChange={(e) => updateField("year", e.target.value)}
              />
              <input
                placeholder="Phone Number"
                value={checkout.phone}
                onChange={(e) =>
                  updateField("phone", e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              ✓ &nbsp;Place Order
            </button>

            {error  && <p className="status error">{error}</p>}
            {status && <p className="status">{status}</p>}

          </aside>
        </div>
      )}
    </div>
  );
}