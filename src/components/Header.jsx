import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/header.css";

export default function Header({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar" style={{ background: '#1A1A2E', backdropFilter: 'none' }}>
      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        ASME<span>-</span>ULFG1
      </Link>

      {/* Desktop nav links */}
      <nav className={`navbar-links ${open ? "navbar-links-open" : ""}`}>
        <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
        <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
        <NavLink to="/events" onClick={closeMenu}>Events</NavLink>
        <NavLink to="/members" onClick={closeMenu}>Membership</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>

        {/* Close button — only visible inside mobile menu */}
        <button className="navbar-close" onClick={closeMenu} aria-label="Close menu">✕</button>
      </nav>

      {/* Hamburger — mobile only */}
      <button
        className={`navbar-hamburger ${open ? "navbar-hamburger-active" : ""}`}
        type="button"
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span /><span /><span />
      </button>

      {/* Backdrop — closes menu when tapping outside */}
      {open && <div className="navbar-backdrop" onClick={closeMenu} />}
    </header>
  );
}