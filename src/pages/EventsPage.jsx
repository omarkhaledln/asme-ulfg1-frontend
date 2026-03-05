import { useEffect, useState } from "react";
import { fetchEvents } from "../lib/api";
import "../styles/events.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_BASE = API_URL.replace("/api", "");

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [yearFilter, setYearFilter] = useState("all");

  useEffect(() => {
    fetchEvents().then((data) =>
      setEvents(Array.isArray(data) ? data : [])
    );
  }, []);

  const filteredEvents =
    yearFilter === "all"
      ? events
      : events.filter((ev) => ev.date.endsWith(yearFilter));

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const [d1, m1, y1] = a.date.split("-").map(Number);
    const [d2, m2, y2] = b.date.split("-").map(Number);
    return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
  });

  const years = ["all", ...Array.from(
    new Set(events.map((ev) => ev.date.split("-")[2]))
  ).sort((a, b) => b - a)];

  return (
    <main className="events-page">

      {/* ── HERO INTRO ── */}
      <section className="events-hero">
        <div className="events-hero-inner">
          <h1>Our <span>Events</span></h1>
          <p>
            From workshops and technical competitions to networking sessions
            and community gatherings — explore everything ASME ULFG1 has
            organized for its members.
          </p>
        </div>
      </section>

      {/* ── INFO BOXES ── */}
      <section className="events-info-section">
        <div className="events-info-header">
          <p>
            ASME events are designed to enhance your technical skills, expand
            your professional network, and give you hands-on engineering
            experience beyond the classroom.
          </p>
        </div>
        <div className="events-info-grid">
          <div className="events-info-box">
            <div className="events-info-icon">🎤</div>
            <div className="events-info-title">Guest Seminars</div>
            <div className="events-info-text">
              We invite engineers and professionals to share their real-world
              stories, career journeys, and practical advice in an open and
              relaxed setting.
            </div>
          </div>
          <div className="events-info-box">
            <div className="events-info-icon">🤝</div>
            <div className="events-info-title">Social Meetups</div>
            <div className="events-info-text">
              Fun activities and casual hangouts that help us build a strong
              community beyond lectures and exams.
            </div>
          </div>
          <div className="events-info-box">
            <div className="events-info-icon">💡</div>
            <div className="events-info-title">Skill Sharing</div>
            <div className="events-info-text">
              Interactive peer-led sessions where members teach each other
              useful skills — no grades, no pressure, just learning together.
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="events-filter-bar">
        <span className="events-filter-label">Filter by Year</span>
        {years.map((year) => (
          <button
            key={year}
            className={`events-filter-btn ${yearFilter === year ? "active" : ""}`}
            onClick={() => setYearFilter(year)}
          >
            {year === "all" ? "All" : year}
          </button>
        ))}
      </div>

      {/* ── EVENTS LIST ── */}
      <section className="events-list-section">
        <div className="events-count">
          Showing <span>{sortedEvents.length}</span> event{sortedEvents.length !== 1 ? "s" : ""}
        </div>

        {sortedEvents.length === 0 ? (
          <p className="events-empty">No events available for this year.</p>
        ) : (
          <div className="events-list">
            {sortedEvents.map((ev) => (
              <div className="event-card" key={ev.id}>

                {/* Poster */}
                <div className="event-poster">
                  {ev.img ? (
                    <img src={`${ev.img}`} alt={ev.title} />
                  ) : (
                    <div className="event-poster-placeholder">
                      <span>📅</span>
                    </div>
                  )}
                  <div className="event-year-badge">
                    {ev.date.split("-")[2]}
                  </div>
                </div>

                {/* Info */}
                <div className="event-info">
                  <div className="event-title">{ev.title}</div>
                  <div className="event-meta">
                    <div className="event-date">📅 {ev.date}</div>
                    {ev.location && (
                      <div className="event-location">📍 {ev.location}</div>
                    )}
                  </div>
                  <div className="event-desc">{ev.description}</div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}