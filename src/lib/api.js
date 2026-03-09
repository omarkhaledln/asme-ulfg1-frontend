import axios from "axios";

const API_BASE = "https://asme-ulfg1-backend.xo.je";

async function proxyGet(endpoint) {
  const path = endpoint.replace(/^\//, "");
  const res = await axios.get(`/.netlify/functions/api?path=${path}`);
  return res;
}

export async function fetchProducts() {
  const res = await proxyGet("/products");
  const raw = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
  return raw.map((p) => ({
    id: p.id,
    title: p.title,
    price_non_members: p.price_non_members,
    price_members: p.price_members,
    img: p.image_url,
    stock: p.stock,
  }));
}

export async function fetchEvents() {
  const res = await proxyGet("/events");
  return res.data.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    description: e.description,
    img: e.image ? `${API_BASE}${e.image}` : "",
  }));
}

export async function fetchCommitteeMembers() {
  const res = await proxyGet("/committee-members");
  return res.data.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    img: m.image ? `${API_BASE}${m.image}` : "",
  }));
}

export async function sendContact(payload) {
  const res = await axios.post(`/.netlify/functions/api?path=contact`, payload);
  return res.data;
}