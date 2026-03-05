import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/members.css";

/* ===============================
   SAFE API CONFIG
================================ */
const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export default function Members() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    department: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState("");

  function validateForm() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.year) return "Please select your year.";
    if (!form.department) return "Please select your department.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!/^\d+$/.test(form.phone))
      return "Phone number must contain only numbers.";
    return "";
  }

  async function sendEmail() {
    const serviceID = "service_n4hop0b";
    const templateID = "template_ufvzvl8";
    const publicKey = "m-3fn3LYyZavvCIgo";

    const templateParams = {
      name: form.name,
      year: form.year,
      department: form.department,
      email: form.email,
      phone: form.phone,
      message: "New ASME Membership Application",
    };

    return emailjs.send(serviceID, templateID, templateParams, publicKey);
  }

  async function sendWhatsApp() {
    const res = await fetch(`${API_URL}/send-whatsapp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("WhatsApp failed");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrors("");
    setStatus("");

    const error = validateForm();
    if (error) {
      setErrors(error);
      return;
    }

    setStatus("Sending…");

    try {
      await sendEmail();
      await sendWhatsApp();

      setStatus("Application submitted successfully!");
      setForm({
        name: "",
        year: "",
        department: "",
        email: "",
        phone: "",
      });
    } catch {
      setStatus("Submission failed. Please try again.");
    }
  }

  return (
    <main className="members-page">

      {/* ── HERO ── */}
      <section className="members-hero">
        <div className="members-hero-inner">
          <h1>Join the <span>ASME ULFG1</span> Family</h1>
          <p>
            Engineering is tough, but it's a lot better when you have a
            community behind you. By joining us, you'll get first access to our
            technical seminars, early updates on student activities, and
            opportunities to connect with engineering students across all
            academic years.
          </p>
        </div>
      </section>

      {/* ── PERKS STRIP ── */}
      <div className="members-perks">
        <div className="members-perk">
          <div className="members-perk-icon">🎤</div>
          <div>
            <div className="members-perk-title">Exclusive Event Access</div>
            <div className="members-perk-desc">Be the first to know about seminars, workshops, and social activities organized by the club.</div>
          </div>
        </div>
        <div className="members-perk">
          <div className="members-perk-icon">🔗</div>
          <div>
            <div className="members-perk-title">Network & Grow</div>
            <div className="members-perk-desc">Connect with students from all years and departments and build relationships beyond the classroom.</div>
          </div>
        </div>
        <div className="members-perk">
          <div className="members-perk-icon">🌍</div>
          <div>
            <div className="members-perk-title">Global ASME Network</div>
            <div className="members-perk-desc">As an official ASME student section, members get access to the world's largest mechanical engineering community.</div>
          </div>
        </div>
      </div>

      {/* ── FORM SECTION ── */}
      <section className="members-form-section">

        {/* Left — benefits */}
        <div className="members-form-left">
          <div className="members-section-tag" />
          <div className="members-section-title">Become a <span>Member</span></div>
          <p className="members-form-desc">
            Fill out the form below to get started and become part of a growing,
            supportive engineering network.
          </p>
          <div className="members-benefits-list">
            {[
              "First access to technical seminars and workshops",
              "Early updates on club activities and events",
              "Opportunities to join the committee and take on leadership roles",
              "Connect with engineering students from all years and departments",
              "Access to the global ASME student network and resources",
            ].map((b, i) => (
              <div key={i} className="members-benefit-item">
                <div className="members-benefit-check">✓</div>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div className="members-form-card">
          <div className="members-form-card-title">Apply Now</div>
          <p className="members-form-card-sub">Takes less than 2 minutes. We'll follow up shortly.</p>

          <form className="members-form" onSubmit={onSubmit}>

            <input
              className="members-input"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <div className="members-field-row">
              <div className="select-wrapper">
                <select
                  className="members-input"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                >
                  <option value="">Year</option>
                  <option value="first">First Year</option>
                  <option value="second">Second Year</option>
                  <option value="third">Third Year</option>
                  <option value="fourth">Fourth Year</option>
                  <option value="fifth">Fifth Year</option>
                </select>
              </div>
              <div className="select-wrapper">
                <select
                  className="members-input"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="">Department</option>
                  <option value="common">Common Trunk</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="electrical">Electrical</option>
                  <option value="civil">Civil</option>
                  <option value="petroleum">Petro-Chemical</option>
                </select>
              </div>
            </div>

            <input
              className="members-input"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="members-input"
              type="tel"
              placeholder="Phone Number (+961 XX XXX XXX)"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
              }
            />

            <button className="members-btn" type="submit">
              Apply Now →
            </button>

            {errors && <p className="members-error">{errors}</p>}
            {status && (
              <p className={`members-status ${status.includes("successfully") ? "members-status-success" : ""}`}>
                {status}
              </p>
            )}

            <p className="members-form-note">
              By applying you agree to be contacted by ASME ULFG1 regarding your membership.
            </p>

          </form>
        </div>

      </section>

    </main>
  );
}