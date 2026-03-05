import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../lib/api";
import "../styles/hero.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_BASE = API_URL.replace("/api", "");

function ProductCard({ item, navigate }) {
  return (
    <div
      className="product-card"
      onClick={() => navigate("/products")}
      role="button"
      tabIndex="0"
    >
      <div className="product-card-img">
        <img
          src={`${API_BASE}${item.img}`}
          alt={item.title}
        />
      </div>
      <div className="product-card-body">
        <div className="product-card-title">{item.title}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data.slice(0, 4));
    });
  }, []);

  return (
    <main className="home-page">

      {/* ── HERO ── */}
      <section className="hero">
        {/* Background layers */}
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-bg-scene">
          <div className="hero-bg-silhouettes">
            {["short","medium","tall","tall","medium","tall","short","medium","tall"].map((size, i) => (
              <div key={i} className={`silhouette ${size}`}>
                <div className="sil-head" />
                <div className="sil-body" />
              </div>
            ))}
          </div>
        </div>
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content">  
          <h1>ASME <span>ULFG1</span></h1>
          <p className="hero-main-text">
            Empowering engineering students through innovation, hands-on
            learning, and community-driven engineering excellence.
          </p>
          <p className="hero-sub-text">
            We bring students together to build, learn, and lead through real
            engineering experiences, workshops, competitions, and technical
            projects.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("/about")}>
              Discover Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stat">
          <div className="stat-num">48+</div>
          <div className="stat-label">Active Members</div>
        </div>
        <div className="stat">
          <div className="stat-num">20+</div>
          <div className="stat-label">Events Done</div>
        </div>
        <div className="stat">
          <div className="stat-num">3</div>
          <div className="stat-label">Years Active</div>
        </div>
      </div>

      {/* ── ABOUT STRIP ── */}
      <div className="about-strip">
        <h2>About Our<br />Club</h2>
        <p>
          We are a student-run mechanical engineering club dedicated to
          hands-on learning, innovation, and collaboration. From robotics to
          manufacturing, our members work on real-world projects that push
          boundaries and develop skills beyond the classroom. Join us and be
          part of something that matters.
        </p>
      </div>

      {/* ── WHY JOIN US ── */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag" />
          <div className="section-title">
            Why <span>Join Us</span>
          </div>
          <div className="section-sub">
            More than a club — a launchpad for your engineering career.
          </div>
        </div>
        <div className="why-grid">
          <div className="why-box">
            <div className="why-icon">⚙️</div>
            <div className="why-title">Hands-On Experience</div>
            <div className="why-text">
              Gain practical engineering experience through workshops,
              competitions, and technical projects.
            </div>
          </div>
          <div className="why-box">
            <div className="why-icon">🤝</div>
            <div className="why-title">Professional Growth</div>
            <div className="why-text">
               Develop leadership, communication, and teamwork skills essential
              for your engineering career.
            </div>
          </div>
          <div className="why-box">
            <div className="why-icon">🚀</div>
            <div className="why-title">Strong Community</div>
            <div className="why-text">
               Join a supportive community of motivated engineering students and
              mentors.
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS / SHOWROOM ── */}
      <section className="section section-dark">
        <div className="section-header">
          <div className="section-tag section-tag-blue" />
          <div className="section-title section-title-light">
            Our <span>Showroom</span>
          </div>
          <div className="section-sub section-sub-dark">
            Designed by students, inspired by engineering, and crafted to
            represent the ASME ULFG1 identity.
          </div>
        </div>
        <div className="products-grid">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} navigate={navigate} />
          ))}
        </div>
        <div className="products-view-all">
          <button className="btn-outline" onClick={() => navigate("/products")}>
            View All Products
          </button>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-tag">Join The Club</div>
          <h2>
            Ready to Be Part of<br />
            <span>ASME ULFG1?</span>
          </h2>
          <p>Join a community that builds engineers, leaders, and innovators.</p>
          <button className="cta-btn" onClick={() => navigate("/members")}>
            Become a Member
          </button>
        </div>
      </section>

    </main>
  );
}