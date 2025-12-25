import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../lib/api";
import "../styles/hero.css";

function ProductCard({ item, navigate }) {
  return (
    <div
      className="home-product-card"
      onClick={() => navigate("/products")}
      role="button"
      tabIndex="0"
    >
      <img
        src={`http://127.0.0.1:8000${item.img}`}
        alt={item.title}
        className="product-image"
      />
      <span className="product-title">{item.title}</span>
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
      {/* HERO */}
      <section className="home-hero-section">
        <img
          src="/images/home/hero.jpg"
          alt="ASME ULFG1 Team"
          className="home-hero-full"
        />

        <div className="home-content">
          <div className="home-hero-text">
            <h1>ASME ULFG1</h1>

            <p className="home-hero-main">
              Empowering engineering students through innovation, hands-on
              learning, and community-driven engineering excellence.
            </p>

            <p className="home-hero-subtext">
              We bring students together to build, learn, and lead through real
              engineering experiences, workshops, competitions, and technical
              projects.
            </p>

            <button className="cta-button" onClick={() => navigate("/about")}>
              Discover Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* WHY ASME */}
      <section className="home-values">
        <h2>Why Join ASME ULFG1?</h2>

        <div className="values-grid">
          <div className="value-card">
            <h3>Hands-On Experience</h3>
            <p>
              Gain practical engineering experience through workshops,
              competitions, and technical projects.
            </p>
          </div>

          <div className="value-card">
            <h3>Professional Growth</h3>
            <p>
              Develop leadership, communication, and teamwork skills essential
              for your engineering career.
            </p>
          </div>

          <div className="value-card">
            <h3>Strong Community</h3>
            <p>
              Join a supportive community of motivated engineering students and
              mentors.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="home-products-section">
        <div className="home-products-header">
          <h2>Featured Products</h2>
          <p>
            Designed by students, inspired by engineering, and crafted to
            represent the ASME ULFG1 identity.
          </p>
        </div>

        <div className="home-products-row">
          <div className="home-products-list">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>

          <button
            className="home-products-more"
            onClick={() => navigate("/products")}
            aria-label="View all products"
          >
            ❯
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to Be Part of ASME ULFG1?</h2>
        <p>
          Join a community that builds engineers, leaders, and innovators.
        </p>
        <button onClick={() => navigate("/members")}>
          Become a Member
        </button>
      </section>
    </main>
  );
}
