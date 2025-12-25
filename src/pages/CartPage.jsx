import { useState } from "react";
import "../styles/cart.css";

export default function CartPage({ cart, onRemoveFromCart }) {
  const API_BASE = import.meta.env.VITE_API_URL.replace("/api", "");

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

  async function handleCheckout() {
    setError("");
    setStatus("");

    const validationError = validateCheckout();
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("Sending…");

    try {
      const res = await fetch(`${API_BASE}/api/checkout`, {
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
      setStatus(data.success ? "Order sent successfully!" : "Failed to send order.");
    } catch {
      setStatus("Error sending order.");
    }
  }

  return (
    <section className="cart-page">
      <h1 className="cart-title">Cart</h1>

      {cart.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <div className="cart-layout">
          {/* LEFT — ITEMS */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-card">
                <img
                  src={`${item.img}`}
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
                      Remove
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

          {/* RIGHT — SUMMARY */}
          <aside className="cart-summary">
            <h2>Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="summary-row">
              <strong>Total for Members</strong>
              <strong>{(totalMembers * 1000).toLocaleString()} LBP</strong>
            </div>

            <div className="summary-row">
              <strong>Total for Non-Members</strong>
              <strong>{(totalNonMembers * 1000).toLocaleString()} LBP</strong>
            </div>

            <div className="checkout-form">
              <h3>Your Information</h3>

              <input placeholder="Full Name" onChange={(e) => updateField("name", e.target.value)} />
              <input placeholder="Email" onChange={(e) => updateField("email", e.target.value)} />
              <input placeholder="Department" onChange={(e) => updateField("department", e.target.value)} />
              <input placeholder="Year" onChange={(e) => updateField("year", e.target.value)} />
              <input
                placeholder="Phone"
                onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>

            {error && <p className="status error">{error}</p>}
            {status && <p className="status">{status}</p>}
          </aside>
        </div>
      )}
    </section>
  );
}
