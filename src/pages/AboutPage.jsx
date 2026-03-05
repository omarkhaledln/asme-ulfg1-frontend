import "../styles/about.css";
import { fetchCommitteeMembers } from "../lib/api";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_BASE = API_URL.replace("/api", "");

export default function AboutPage() {
  const [committee, setCommittee] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchCommitteeMembers().then((data) =>
      setCommittee(Array.isArray(data) ? data : [])
    );
  }, []);

  const faqs = [
    {
      q: "Who can join ASME ULFG1?",
      a: "Any ULFG1 student! Whether you're here for the guest talks or just to meet new people, everyone is welcome.",
    },
    {
      q: "Do I need to be a mechanical engineering student?",
      a: "Not at all, we're open to all engineering departments at the faculty. Whether you're into civil, electrical, or any other department, you're more than welcome to join us.",
    },
    {
      q: "How often do you meet?",
      a: "We don't have a fixed daily schedule. We usually organize a few seminars or fun activities per semester. (check our Events page for the latest)",
    },
    {
      q: "How can I get involved?",
      a: "Just sign up on our Membership page or show up to our next event to say hello!",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="about-page">

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <h1>About <span>ASME ULFG1</span></h1>
          <p>We are the official student section of the American Society of Mechanical Engineers at the Faculty of Engineering — Branch 1, Lebanese University.</p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="about-stats-bar">
        <div className="about-stat">
          <div className="about-stat-num">2023</div>
          <div className="about-stat-label">Founded</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">12</div>
          <div className="about-stat-label">Committee Members</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">60+</div>
          <div className="about-stat-label">Total Members</div>
        </div>
      </div>

      {/* ── ABOUT + MISSION / VISION ── */}
      <section className="about-text-section">
        <div className="about-text-grid">
          <div className="about-text-left">
            <div className="section-tag" />
            <div className="section-title">About <span>ASME</span></div>
            <p className="section-body">
              A community of engineering students at ULFG1 who believe that
              learning is better when we do it together. Founded in 2023, we
              are the official student section of the American Society of
              Mechanical Engineers (ASME) at our faculty. While ASME is a
              massive global network, our local chapter is all about making the
              student experience more engaging. We focus on bringing people
              together through social events, guest talks, and activities that
              make engineering feel a bit less like a textbook and more like a
              community.
            </p>
          </div>
          <div className="about-text-right">
            <div className="mv-block">
              <div className="mv-label">Our Mission</div>
              <div className="mv-text">
                Our mission is to empower ULFG1 engineering students through
                hands-on learning, technical workshops, competitions, and
                collaborative projects. We strive to bridge the gap between
                academic study and real-world engineering practice while
                fostering leadership, creativity, and professionalism.
              </div>
            </div>
            <div className="mv-block">
              <div className="mv-label">Our Vision</div>
              <div className="mv-text">
                To be the heart of the engineering department — a place where
                every student feels welcome to share ideas, have a laugh, and
                build friendships that last beyond graduation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="values-section">
        <div className="section-tag section-tag-blue" />
        <div className="section-title section-title-white">
          Our Core <span>Values</span>
        </div>
        <div className="values-grid">
          <div className="value-box">
            <div className="value-name">🤝 Community</div>
            <div className="value-desc">We're students first; we look out for one another.</div>
          </div>
          <div className="value-box">
            <div className="value-name">🔍 Curiosity</div>
            <div className="value-desc">Learning shouldn't always be for a grade.</div>
          </div>
          <div className="value-box">
            <div className="value-name">🌍 Inclusivity</div>
            <div className="value-desc">Whether you're a first-year or a senior, there's a seat for you here.</div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="wedo-section">
        <div className="section-tag" />
        <div className="section-title">What We <span>Do</span></div>
        <div className="wedo-grid">
          <div className="wedo-box">
            <div className="wedo-icon">🎤</div>
            <div className="wedo-name">Student Seminars</div>
            <div className="wedo-desc">Hearing from people who've been where we are — engineers and professionals sharing real stories and practical advice.</div>
          </div>
          <div className="wedo-box">
            <div className="wedo-icon">🎉</div>
            <div className="wedo-name">Social Activities</div>
            <div className="wedo-desc">Events designed to help us de-stress and bond outside the classroom. Because engineering is more fun with friends.</div>
          </div>
          <div className="wedo-box">
            <div className="wedo-icon">🔗</div>
            <div className="wedo-name">Networking</div>
            <div className="wedo-desc">Connecting you with peers and mentors in a relaxed environment that opens doors for your future career.</div>
          </div>
        </div>
      </section>

      {/* ── COMMITTEE ── */}
      <section className="committee-section">
        <div className="section-tag" />
        <div className="section-title">Meet the <span>Committee</span></div>
        <div className="committee-grid">
          {committee.map((member) => (
            <div key={member.id} className="committee-card">
              <img
                src={`${member.img}`}
                alt={member.name}
                className="committee-avatar"
              />
              <div className="committee-name">{member.name}</div>
              <div className="committee-role">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="section-tag section-tag-blue" />
        <div className="section-title section-title-white">
          Frequently Asked <span>Questions</span>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-arrow" />
                </div>
                {isOpen && (
                  <p className="faq-answer">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}