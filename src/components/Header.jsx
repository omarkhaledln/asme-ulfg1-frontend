import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="nav">
      <Link to="/" className="logo" onClick={closeMenu}>
        ASME
      </Link>

      {/* Desktop / base nav */}
      <nav className={`links ${open ? "links-open" : ""}`}>
         <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={closeMenu}>
          Products
        </NavLink>
        <NavLink to="/events" onClick={closeMenu}>
          Events
        </NavLink>
        <NavLink to="/members" onClick={closeMenu}>
          Membership
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="hamburger"
        type="button"
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        ☰
      </button>
    </header>
  );
}
