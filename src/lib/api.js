import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  timeout: 10000,
});

export async function fetchProducts() {
  const res = await api.get("/products");
  const items = res.data.map((p) => ({
    id: p.id,
    title: p.title,
    price_non_members: p.price_non_members,
    price_members: p.price_members,
    img: p.image_url,   
    stock: p.stock,
  }));
  return items; 
}


export async function fetchEvents() {
  const res = await api.get("/events");
  return res.data.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    description: e.description,
    img: e.image, 
  }));
}

export async function fetchCommitteeMembers() {
  const res = await api.get("/committee-members");

  return res.data.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    img : m.image,
  }));
}







export function sendContact(payload) {
  return api.post("/contact", payload).then((r) => r.data);
}
