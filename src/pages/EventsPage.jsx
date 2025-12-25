import { useEffect, useState } from "react";
import { fetchEvents } from "../lib/api";
import "../styles/events.css";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <section className="events-page">

      {/* HERO / INTRO */}
      <div className="events-hero">
        <h1 className="events-hero-title">Our Events</h1>
        <p className="events-hero-text">
          ASME events are designed to enhance your technical skills, expand your
          professional network, and give you hands-on engineering experience
          beyond the classroom.
        </p>
      </div>

      {/* HIGHLIGHTS */}
      <div className="events-highlights">
        <div className="highlight-card">
          <h3>Technical Workshops</h3>
          <p>
            Hands-on workshops focused on real engineering tools, software, and
            practical applications.
          </p>
        </div>

        <div className="highlight-card">
          <h3>Industry Talks</h3>
          <p>
            Learn directly from professionals, alumni, and companies working in
            the engineering field.
          </p>
        </div>

        <div className="highlight-card">
          <h3>Student Activities</h3>
          <p>
            Competitions, teamwork challenges, and interactive activities that
            build collaboration and leadership skills.
          </p>
        </div>
      </div>

      {/* EVENTS LIST */}
      <h2 className="events-section-title">All Events</h2>

      <div className="events-list">
        {[...events]
          .sort((a, b) => {
            const [d1, m1, y1] = a.date.split("-").map(Number);
            const [d2, m2, y2] = b.date.split("-").map(Number);

            const dateA = new Date(y1, m1 - 1, d1);
            const dateB = new Date(y2, m2 - 1, d2);

            return dateB - dateA; // newest → oldest
          })
          .map((ev) => (
            <div className="event-card" key={ev.id}>
              <img
                src={`${API_URL}${ev.img}`}
                className="event-img"
                alt={ev.title}
              />

              <div className="event-details">
                <h3 className="event-title">{ev.title}</h3>
                <p className="event-date">{ev.date}</p>
                <p className="event-desc">{ev.description}</p>
              </div>
            </div>
          ))}
      </div>

    </section>
  );
}
