import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `https://corsproxy.io/?${import.meta.env.VITE_API_URL}`
    : `https://corsproxy.io/?http://127.0.0.1:8000/api`,
  timeout: 10000,
});

export async function fetchProducts() {
  const res = await api.get("/products");

  // ✅ Normalize Laravel response
  const raw = Array.isArray(res.data)
    ? res.data
    : Array.isArray(res.data.data)
    ? res.data.data
    : [];

  return raw.map((p) => ({
    id: p.id,
    title: p.title,
    price_non_members: p.price_non_members,
    price_members: p.price_members,
    img: p.image_url, // "/images/products/..."
    stock: p.stock,
  }));
}

export async function fetchEvents() {
  const res = await api.get("/events");
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const API_BASE = API_URL.replace("/api", "");


  return res.data.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    description: e.description,
    img: e.image ? `${API_BASE}${e.image}` : "",
  }));
}



export async function fetchCommitteeMembers() {
  const res = await api.get("/committee-members");
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const API_BASE = API_URL.replace("/api", "");


  return res.data.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    img: m.image ? `${API_BASE}${m.image}` : "",
  }));
}







export function sendContact(payload) {
  return api.post("/contact", payload).then((r) => r.data);
}
