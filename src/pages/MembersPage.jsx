import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/members.css";

const API_URL = import.meta.env.VITE_API_URL;

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
    <section className="members-page">
      {/* INTRO */}
      <div className="members-intro">
        <h1 className="members-title">Join ASME</h1>
        <p className="members-subtitle">
          Become part of a professional engineering community that supports
          learning, leadership, and real-world experience.
        </p>
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
          <option value="common">Common Trunk</option>
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
