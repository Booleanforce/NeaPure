import { apiClient } from "./apiClient";

export interface ChatResponse {
  reply: string;
  session_id: string;
}

export const aiAssistantService = {
  /**
   * Send a chat message to the AI assistant
   * @param message The user's message
   * @param sessionId Optional session ID. If not provided, it will check localStorage.
   */
  sendChatMessage(message: string, sessionId?: string) {
    const currentSessionId = sessionId || this.getSessionId() || undefined;
    
    return apiClient.post<ChatResponse>("/api/ai/chat/", {
      message,
      session_key: currentSessionId,
    });
  },

  /**
   * Retrieves the AI chat session ID from localStorage
   */
  getSessionId(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("neapure_ai_session_id");
    }
    return null;
  },

  /**
   * Persists the AI chat session ID to localStorage
   */
  setSessionId(sessionId: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("neapure_ai_session_id", sessionId);
    }
  },

  /**
   * Clears the AI chat session ID from localStorage
   */
  clearSessionId(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("neapure_ai_session_id");
    }
  }
};
