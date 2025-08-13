import { createContext, useContext, useReducer } from "react";

const ChatContext = createContext();

const initialState = {
  history: [], // [{ id, role: "user"|"ai", text }]
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        history: [
          ...state.history,
          { id: crypto.randomUUID(), role: "user", text: action.text }
        ],
      };
    case "ADD_AI":
      return {
        ...state,
        history: [
          ...state.history,
          { id: crypto.randomUUID(), role: "ai", text: action.text }
        ],
      };
    case "SET_HISTORY": // 👈 Cargar conversación guardada
      return { ...state, history: action.history || [] };
    case "CLEAR": // Nueva conversación
      return initialState;
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
