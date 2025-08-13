import { ChatProvider, useChat } from "./context/ChatContext";
import { useOllama } from "./hooks/useOllama";
import History from "./components/History";
import ChatBox from "./components/ChatBox";

function ChatApp() {
  const { state, dispatch } = useChat();
  const { ask, isLoading, err } = useOllama("deepseek-r1:1.5b");

  const handleSend = async (text) => {
    dispatch({ type: "ADD_USER", text });
    const reply = await ask(text);
    dispatch({ type: "ADD_AI", text: reply || "(sin respuesta)" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Chat (Ollama + DeepSeek R1)</h1>

        {err && <p className="text-sm text-red-600">Error: {err}</p>}

        <div className="border rounded-2xl bg-white p-4 h-[65vh] overflow-y-auto">
          <History items={state.history} />
        </div>

        <ChatBox onSend={handleSend} disabled={isLoading} />
        {isLoading && <p className="text-xs text-gray-500">Pensando…</p>}

        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: "CLEAR" })}
            className="text-sm px-3 py-1 rounded-lg border"
          >
            Limpiar historial
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}
