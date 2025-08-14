import { createContext, useContext, useReducer } from "react";

// 1) Crear contexto
const ChatContext = createContext();

// Estado inicial global
const initialState = {
  history: [], // [{ id, role: "user"|"ai", text }]
};

// Opcional pero recomendado: Reducer para acciones
function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        history: [
          ...state.history,
          { id: crypto.randomUUID(), role: "user", text: action.text },
        ],
      };
    case "ADD_AI":
      return {
        ...state,
        history: [
          ...state.history,
          { id: crypto.randomUUID(), role: "ai", text: action.text },
        ],
      };
    case "SET_HISTORY": // para cargar un chat guardado (si ya lo tienes)
      return { ...state, history: action.history || [] };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

// 2) Provider que envuelve la app
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

// 3) Hook para consumir el contexto en cualquier componente
export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx; // { state, dispatch }
}
