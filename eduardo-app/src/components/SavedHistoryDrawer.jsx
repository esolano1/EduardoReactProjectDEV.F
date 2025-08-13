import { useEffect, useState } from "react";
import { getAllChats, removeChat } from "../utils/historyStorage";

// Drawer simple: overlay + panel lateral derecho
export default function SavedHistoryDrawer({ open, onClose, onLoad }) {
  const [chats, setChats] = useState([]);

  const refresh = () => setChats(getAllChats());

  useEffect(() => {
    if (open) refresh();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden
      />
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Historial de conversaciones</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border text-sm"
          >
            Cerrar
          </button>
        </div>

        {chats.length === 0 ? (
          <p className="text-sm text-gray-500">
            No tienes conversaciones guardadas todavía.
          </p>
        ) : (
          <ul className="space-y-2">
            {chats.map((c) => (
              <li key={c.id} className="border rounded-xl p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {c.messages.length} mensajes
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onLoad(c); // entrega el chat al padre
                        onClose();
                      }}
                      className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white"
                    >
                      Cargar
                    </button>
                    <button
                      onClick={() => {
                        removeChat(c.id);
                        refresh();
                      }}
                      className="text-sm px-3 py-1 rounded-lg border"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
