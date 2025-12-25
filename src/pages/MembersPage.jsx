import { useState } from "react";
import "../styles/members.css";

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
    if (!/^\d+$/.test(form.phone)) return "Phone number must contain only numbers.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrors("");

    const error = validateForm();
    if (error) {
      setErrors(error);
      return;
    }

    setStatus("Sending…");

    try {
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
    <section className="members-page">

      {/* INTRO */}
      <div className="members-intro">
        <h1 className="members-title">Join ASME</h1>
        <p className="members-subtitle">
          Become part of a professional engineering community that supports
          learning, leadership, and real-world experience.
        </p>
      </div>

      {/* BENEFITS */}
      <div className="members-benefits">
        <h2>Why Join ASME?</h2>

        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Professional Development</h3>
            <p>Workshops and technical sessions led by industry professionals.</p>
          </div>

          <div className="benefit-card">
            <h3>Networking Opportunities</h3>
            <p>Connect with engineers, alumni, and companies through events.</p>
          </div>

          <div className="benefit-card">
            <h3>Hands-On Experience</h3>
            <p>Participate in real projects, challenges, and applied learning.</p>
          </div>

          <div className="benefit-card">
            <h3>Leadership Skills</h3>
            <p>Gain leadership experience by joining committees and teams.</p>
          </div>

          <div className="benefit-card">
            <h3>Career Growth</h3>
            <p>Enhance your CV with recognized professional activities.</p>
          </div>

          <div className="benefit-card">
            <h3>Community & Support</h3>
            <p>Be part of a motivated engineering student community.</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form className="members-form" onSubmit={onSubmit}>
        <h2 className="form-title">Membership Application</h2>

        <input
          className="members-input"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <select
          className="members-input"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Department</option>
          <option value="mechanical">Mechanical</option>
          <option value="electrical">Electrical</option>
          <option value="civil">Civil</option>
          <option value="petroleum">Petroleum</option>
        </select>

        <input
          className="members-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="members-input"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
          }
        />

        <button className="members-btn" type="submit">
          Apply Now
        </button>

        {errors && <p className="members-error">{errors}</p>}
        {status && <p className="members-status">{status}</p>}
      </form>
    </section>
  );
}
