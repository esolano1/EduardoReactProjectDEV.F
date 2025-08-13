// Utilidades simples para guardar/cargar conversaciones en localStorage

const KEY = "savedChats_v1";

export function getAllChats() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveChat({ title, messages }) {
  const chats = getAllChats();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  chats.unshift({ id, title, createdAt, messages }); // unshift -> al inicio
  localStorage.setItem(KEY, JSON.stringify(chats));
  return id;
}

export function removeChat(id) {
  const chats = getAllChats().filter(c => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(chats));
}

export function getChat(id) {
  return getAllChats().find(c => c.id === id) || null;
}
