import { useChat } from "../context/ChatContext";

export default function History() {
  const { state } = useChat();            // ← lee history del contexto
  const items = state.history;

  return (
    <div className="space-y-3">
      {items.map((m) => (
        <div
          key={m.id}
          className={`p-3 rounded-xl max-w-[85%] ${
            m.role === "user" ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-gray-100 text-gray-900"
          }`}
        >
          {m.text}
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-sm text-gray-500">No hay mensajes todavía…</p>
      )}
    </div>
  );
}
