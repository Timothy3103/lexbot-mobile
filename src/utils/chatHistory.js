import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAT_HISTORY_KEY = "lexbot_chat_history";

export const saveChatSession = async (session) => {
  try {
    const existing = await getChatHistory();
    const updated = [session, ...existing.filter((s) => s.id !== session.id)];
    await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving chat session:", error);
  }
};

export const getChatHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error getting chat history:", error);
    return [];
  }
};

export const deleteChatSession = async (sessionId) => {
  try {
    const existing = await getChatHistory();
    const updated = existing.filter((s) => s.id !== sessionId);
    await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error deleting chat session:", error);
  }
};

export const clearAllHistory = async () => {
  try {
    await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error("Error clearing chat history:", error);
  }
};
