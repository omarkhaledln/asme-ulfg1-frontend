import "../styles/about.css";
import { fetchCommitteeMembers } from "../lib/api";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const API_BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  const [committee, setCommittee] = useState([]);

  useEffect(() => {
    fetchCommitteeMembers().then(setCommittee);
  }, []);

  return (
    <section className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <h1 className="about-title">About ASME ULFG1</h1>
        <p className="about-subtitle">
          A student-led engineering community dedicated to excellence,
          innovation, and professional growth.
        </p>
      </div>

      {/* INTRO */}
      <p className="muted">
        ASME ULFG1 is the official student section of the{" "}
        <strong>American Society of Mechanical Engineers (ASME)</strong>,
        one of the world’s largest professional engineering organizations.
        We aim to connect engineering students with real-world experiences,
        professional development, and a strong technical community.
      </p>

      {/* STATS */}
      <div className="about-stats">
        <p><strong className="highlight">2023</strong> Founded</p>
        <p><strong className="highlight">12</strong> Committee Members</p>
        <p><strong className="highlight">60+</strong> Active Members</p>
      </div>

      {/* ABOUT ASME */}
      <h2 className="h2">About ASME</h2>
      <p className="muted">
        The <strong>American Society of Mechanical Engineers (ASME)</strong> is a
        global organization dedicated to advancing engineering knowledge,
        promoting innovation, and supporting engineers at every stage of their
        careers. Founded in 1880, ASME sets internationally recognized standards
        and provides engineers with opportunities for collaboration, education,
        and leadership.
      </p>

      {/* MISSION */}
      <h2 className="h2">Our Mission</h2>
      <p className="muted mission-text">
        Our mission is to empower engineering students through hands-on learning,
        technical workshops, competitions, and collaborative projects. We strive
        to bridge the gap between academic study and real-world engineering
        practice while fostering leadership, creativity, and professionalism.
      </p>

      {/* VISION */}
      <h2 className="h2">Our Vision</h2>
      <p className="muted">
        To become a leading student engineering chapter that produces skilled,
        innovative, and responsible engineers capable of shaping the future of
        technology and industry.
      </p>

      {/* VALUES */}
      <h2 className="h2">Our Core Values</h2>
      <ul className="about-list">
        <li><strong>Excellence:</strong> Commitment to high engineering and ethical standards.</li>
        <li><strong>Innovation:</strong> Encouraging creativity and problem-solving.</li>
        <li><strong>Collaboration:</strong> Engineering thrives through teamwork.</li>
        <li><strong>Integrity:</strong> Honesty, responsibility, and professionalism.</li>
        <li><strong>Leadership:</strong> Developing confident future leaders.</li>
      </ul>

      {/* ACTIVITIES */}
      <h2 className="h2">What We Do</h2>
      <ul className="about-list">
        <li>Technical workshops and hands-on training</li>
        <li>Industry talks and professional networking events</li>
        <li>Engineering competitions and applied projects</li>
        <li>Student-led innovation and research initiatives</li>
        <li>Career development and mentorship opportunities</li>
      </ul>

      {/* COMMITTEE */}
      <h2 className="h2">Meet the Committee</h2>
      <p className="muted">
        Our committee is composed of dedicated students who lead, organize,
        and manage ASME ULFG1 activities throughout the academic year.
      </p>

      <div className="committee-grid">
        {committee.map((member) => (
          <div key={member.id} className="committee-card">
            <img
              src={`${API_BASE}${member.img}`}
              alt={member.name}
              className="committee-avatar"
            />
            <h3 className="committee-name">{member.name}</h3>
            <p className="committee-role">{member.role}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="h2">Frequently Asked Questions</h2>

      <details className="faq-item">
        <summary>Who can join ASME ULFG1?</summary>
        <p>
          ASME ULFG1 is open to engineering students who are interested in
          professional growth, innovation, and leadership.
        </p>
      </details>

      <details className="faq-item">
        <summary>Do I need to be a mechanical engineering student?</summary>
        <p>
          While ASME focuses on mechanical engineering, students from related
          engineering disciplines are welcome to join.
        </p>
      </details>

      <details className="faq-item">
        <summary>Are there member-only benefits?</summary>
        <p>
          Members gain access to exclusive workshops, networking events,
          leadership roles, and professional development opportunities.
        </p>
      </details>

      <details className="faq-item">
        <summary>How can I get involved?</summary>
        <p>
          You can get involved by attending our events, applying through the
          Membership page, or contacting a committee member directly.
        </p>
      </details>

    </section>
  );
}
