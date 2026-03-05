import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">ASME<span>-</span>ULFG1</div>

      <p className="footer-copy">
        © {new Date().getFullYear()} ASME-ULFG1 — All rights reserved.
      </p>

      <div className="footer-links">
        <a href="https://www.instagram.com/asme.ulfg1" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://wa.me/96176737700" target="_blank" rel="noopener noreferrer">Contact</a>
      </div>
    </footer>
  );
}