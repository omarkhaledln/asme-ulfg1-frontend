import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_BASE = API_URL.replace("/api", "");

async function proxyGet(endpoint) {
  const targetUrl = `${API_URL}${endpoint}`;
  const res = await axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
  return res;
}

async function proxyPost(endpoint, data) {
  const targetUrl = `${API_URL}${endpoint}`;
  const res = await axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
  return res;
}

export const api = axios.create({ baseURL: API_URL, timeout: 10000 });

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

export function sendContact(payload) {
  return axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(`${API_URL}/contact`)}`)
    .then((r) => r.data);
}