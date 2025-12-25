import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">© {new Date().getFullYear()} My App</div>

      <div className="footer-right">
        <a 
  href="https://wa.me/96176737700"
  target="_blank"
  rel="noopener noreferrer"
  className="nav-link"
>
  Contact
</a>

        {/* <NavLink to="/contact" className="footer-link">
          Contact us
        </NavLink> */}
      </div>
    </footer>
  );
}
