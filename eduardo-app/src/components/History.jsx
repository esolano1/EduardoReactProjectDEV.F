export default function History({ items }) {
  return (
    <div className="space-y-3">
      {items.map((m) => (
        <div
          key={m.id}
          className={`p-3 rounded-xl max-w-[85%] ${
            m.role === "user" ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-gray-100 text-gray-900"
          }`}
        >
          <p className="whitespace-pre-wrap">{m.text}</p>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-sm text-gray-500">Empieza la conversación escribiendo tu primer mensaje…</p>
      )}
    </div>
  );
}
