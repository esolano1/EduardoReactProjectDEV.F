import { useState } from "react";

export default function ChatBox({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        className="flex-1 border rounded-xl px-3 py-2 focus:ring focus:ring-blue-300 min-h-[48px]"
        placeholder="Escribe tu prompt… (Enter para enviar)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-60"
      >
        Enviar
      </button>
    </div>
  );
}
