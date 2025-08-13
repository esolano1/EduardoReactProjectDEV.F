import { useState } from "react";

export function useOllama(model = "deepseek-r1:1.5b") {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const ask = async (prompt) => {
    setIsLoading(true);
    setErr(null);
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,          // 👈 clave: desactiva streaming
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Ollama responde { response: "texto...", ... }
      return data?.response?.trim() ?? "";
    } catch (e) {
      setErr(e.message || "Error consultando Ollama");
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  return { ask, isLoading, err };
}
