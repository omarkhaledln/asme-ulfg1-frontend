import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    department: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState("");

  // FULL VALIDATION
  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.year) return "Please select your year.";
    if (!form.department) return "Please select your department.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!/^\d+$/.test(form.phone)) return "Phone number must contain only numbers.";
    // if (!form.message.trim()) return "Please enter your message.";
    return "";
  };

  async function sendWhatsApp(form) {
  const res = await fetch("http://127.0.0.1:8000/send-whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("WhatsApp failed");
}


//   async function sendWhatsApp(form) {
//   const res = await fetch("http://127.0.0.1:8000/send-whatsapp", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(form),
//   });

//   if (!res.ok) {
//     throw new Error("WhatsApp sending failed");
//   }
// }


  // EMAILJS SEND FUNCTION
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
      message: form.message,
    };

    return emailjs.send(serviceID, templateID, templateParams, publicKey);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    setStatus("Sending…");

    try {
      await sendEmail();
      await sendWhatsApp(form); // Laravel → Twilio WhatsApp

      setStatus("Sent! We’ll be in touch.");
      setForm({
        name: "",
        year: "",
        department: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (e) {
      setStatus("Failed to send. Please try again.");
    }
  };

  return (
    <section>
      <h1 className="h1">Contact Us</h1>

      <form className="form" onSubmit={onSubmit}>

        {/* NAME */}
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* YEAR */}
        <select
          className="input"
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

        {/* DEPARTMENT */}
        <select
          className="input"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Department</option>
          <option value="common">Common Trunk</option>
          <option value="electric">Electric</option>
          <option value="mechanical">Mechanical</option>
          <option value="petro">Petro-Chemical</option>
          <option value="civil">Civil</option>
        </select>

        {/* EMAIL */}
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PHONE */}
        <input
          className="input"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setForm({ ...form, phone: onlyNumbers });
          }}
        />

        {/* MESSAGE */}
        {/* <textarea
          className="textarea"
          rows={5}
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        /> */}

        <button className="btn" type="submit">Send</button>
      </form>

      {/* VALIDATION ERROR */}
      {errors && <p className="status" style={{ color: "red" }}>{errors}</p>}

      {/* SEND STATUS */}
      <p className="status">{status}</p>
    </section>
  );
}
