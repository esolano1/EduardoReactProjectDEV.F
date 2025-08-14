import { useChat } from "../context/ChatContext";

export default function HistoryCount() {
  const { state } = useChat();
  return (
    <p className="text-sm text-gray-600">
      Mensajes totales: <strong>{state.history.length}</strong>
    </p>
  );
}
