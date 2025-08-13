import { useState } from "react";
import { ChatProvider, useChat } from "./context/ChatContext";
import { useOllama } from "./hooks/useOllama";
import History from "./components/History";
import ChatBox from "./components/ChatBox";
import SavedHistoryDrawer from "./components/SavedHistoryDrawer";
import { saveChat } from "./utils/historyStorage";

function ChatApp() {
  const { state, dispatch } = useChat();
  const { ask, isLoading, err } = useOllama("deepseek-r1:1.5b");
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleSend = async (text) => {
    dispatch({ type: "ADD_USER", text });
    const reply = await ask(text);
    dispatch({ type: "ADD_AI", text: reply || "(sin respuesta)" });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleSave = () => {
    if (state.history.length === 0) {
      alert("No hay nada que guardar aún.");
      return;
    }
    const firstUser = state.history.find(m => m.role === "user");
    const fallbackTitle = `Conversación ${new Date().toLocaleString()}`;
    const title = firstUser?.text?.slice(0, 50) || fallbackTitle;

    saveChat({ title, messages: state.history });
    alert("Conversación guardada en historial ✅");
  };

  const handleLoadFromDrawer = (chat) => {
    // chat.messages es un arreglo compatible con state.history
    dispatch({ type: "SET_HISTORY", history: chat.messages });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chat (Ollama + DeepSeek R1)</h1>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-sm px-3 py-1 rounded-lg border"
            >
              Guardar en historial
            </button>
            <button
              onClick={() => setOpenDrawer(true)}
              className="text-sm px-3 py-1 rounded-lg border"
            >
              Ver historial
            </button>
            <button
              onClick={handleClear}
              className="text-sm px-3 py-1 rounded-lg border"
            >
              Nueva conversación
            </button>
          </div>
        </div>

        {err && <p className="text-sm text-red-600">Error: {err}</p>}

        <div className="border rounded-2xl bg-white p-4 h-[65vh] overflow-y-auto">
          <History items={state.history} />
        </div>

        <ChatBox onSend={handleSend} disabled={isLoading} />
        {isLoading && <p className="text-xs text-gray-500">Pensando…</p>}
      </div>

      {/* Drawer del historial */}
      <SavedHistoryDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoad={handleLoadFromDrawer}
      />
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
