import { useState } from "react";
import { useChat } from "./context/ChatContext";
// (Si usas Ollama en la parte 2)
import { useOllama } from "./hooks/useOllama";
import History from "./components/History";
import ChatBox from "./components/ChatBox";
import HistoryCount from "./components/HistoryCount";


export default function App() {
  const { state, dispatch } = useChat();           
  const { ask, isLoading, err } = useOllama("deepseek-r1:1.5b");
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    dispatch({ type: "ADD_USER", text });             
    const reply = await ask(text);                
    dispatch({ type: "ADD_AI", text: reply || "(sin respuesta)" });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-4">
      <h1 className="text-2xl font-bold">useContext</h1>
      {err && <p className="text-sm text-red-600">Error: {err}</p>}

      {}
      <div className="border rounded-2xl bg-white p-4 h-[50vh] overflow-y-auto">
        <History /> {}
      </div>

      {}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          placeholder="Escribe tu mensaje…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-60"
        >
          Enviar
        </button>
        <button
          onClick={() => dispatch({ type: "CLEAR" })}
          className="px-4 py-2 rounded-xl border"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
