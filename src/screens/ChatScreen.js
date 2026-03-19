import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chatSessionCache = {};

export default function ChatScreen({ navigation, route }) {
  const { topic, icon } = route.params || {};

  const getOpeningMessage = () => {
    if (topic) {
      return `Hello! I'm LexBot, your Nigerian legal guide. I can see you're asking about ${icon} ${topic}. What's your question? You can ask in English or Pidgin.`;
    }
    return "Hello! I'm LexBot, your Nigerian legal guide. How can I help you today? You can ask in English or Pidgin.";
  };

  const chatKey = topic ? `chat-${topic}` : "chat-default";

  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "ai",
      text: getOpeningMessage(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (chatSessionCache[chatKey]) {
        setMessages(chatSessionCache[chatKey]);
      } else {
        setMessages([
          {
            id: "1",
            role: "ai",
            text: getOpeningMessage(),
          },
        ]);
      }
    }, [chatKey, topic]),
  );

  useEffect(() => {
    chatSessionCache[chatKey] = messages;
  }, [chatKey, messages]);
  const flatListRef = useRef(null);

  const WEBHOOK_URL =
    "https://niffyjade-n8n-free.hf.space/webhook/5ccdc6e2-b7e5-40bc-a574-a470fe473639";

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: "__loading__", role: "ai", text: "LexBot is typing..." },
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          text: userMessage.text,
          messageId: userMessage.id,
          // Optionally include more context (user id, locale, history, etc.)
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook error ${response.status}`);
      }

      const text = await response.text();
      let data = null;
      if (text.trim()) {
        try {
          data = JSON.parse(text);
        } catch (jsonError) {
          console.warn("n8n response is not valid JSON", jsonError, text);
        }
      }

      const aiText =
        data?.reply ||
        data?.message ||
        data?.answer ||
        text.trim() ||
        "n8n did not return a response. Please check your workflow.";

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: aiText,
      };

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "__loading__"),
        aiMessage,
      ]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: `⚠️ Error connecting to n8n: ${error.message}`,
      };
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "__loading__"),
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessageText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => {
      const trimmed = line.trim();
      const headingMatch = trimmed.match(/^\*+\s*/);
      const isHeading = Boolean(headingMatch);
      const cleanLine = isHeading ? trimmed.replace(/^\*+\s*/, "") : line;

      const inlineRegex = /\*\*(.+?)\*\*/g;
      let lastIndex = 0;
      const segments = [];
      let match;

      while ((match = inlineRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          segments.push({
            text: cleanLine.slice(lastIndex, match.index),
            bold: false,
          });
        }
        segments.push({ text: match[1], bold: true });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < cleanLine.length) {
        segments.push({ text: cleanLine.slice(lastIndex), bold: false });
      }

      if (segments.length === 0) {
        segments.push({ text: cleanLine, bold: false });
      }

      return {
        segments,
        isHeading,
        isLastLine: lineIndex === lines.length - 1,
      };
    });
  };

  const renderMessage = ({ item }) => {
    const isAI = item.role === "ai";
    const formatted = formatMessageText(item.text);

    return (
      <View
        style={[
          styles.bubbleWrapper,
          isAI ? styles.bubbleWrapperAI : styles.bubbleWrapperUser,
        ]}
      >
        {isAI && <Text style={styles.aiLabel}>⚖️ LexBot</Text>}
        <View
          style={[styles.bubble, isAI ? styles.bubbleAI : styles.bubbleUser]}
        >
          <Text style={styles.bubbleText}>
            {formatted.map((line, index) => (
              <Text
                key={`${item.id}-${index}`}
                style={line.isHeading ? styles.headingText : undefined}
              >
                {line.segments.map((segment, segIndex) => (
                  <Text
                    key={`${item.id}-${index}-${segIndex}`}
                    style={segment.bold ? styles.boldText : undefined}
                  >
                    {segment.text}
                  </Text>
                ))}
                {!line.isLastLine ? "\n" : ""}
              </Text>
            ))}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>
            {topic ? `${icon} ${topic}` : "LexBot"}
          </Text>
          <Text style={styles.headerStatus}>🟢 Online · Nigerian Law</Text>
        </View>
        <View style={styles.headerLang}>
          <Text style={styles.headerLangText}>EN</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your question..."
            placeholderTextColor="#64748B"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              (!input.trim() || loading) && styles.sendBtnDisabled,
            ]}
            onPress={sendMessage}
            disabled={!input.trim() || loading}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0F1E",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#1E2D45",
  },
  backBtn: {
    padding: 4,
  },
  backText: {
    fontSize: 24,
    color: "#C8922A",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  headerStatus: {
    fontSize: 11,
    color: "#22C55E",
    marginTop: 1,
  },
  headerLang: {
    backgroundColor: "#1A2235",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  headerLangText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#C8922A",
  },
  messagesList: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
  },
  bubbleWrapper: {
    maxWidth: "82%",
    gap: 4,
    marginBottom: 8,
  },
  bubbleWrapperAI: {
    alignSelf: "flex-start",
  },
  bubbleWrapperUser: {
    alignSelf: "flex-end",
  },
  aiLabel: {
    fontSize: 10,
    color: "#C8922A",
    fontWeight: "700",
    marginLeft: 4,
  },
  bubble: {
    borderRadius: 18,
    padding: 12,
  },
  bubbleAI: {
    backgroundColor: "#1A2235",
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  bubbleUser: {
    backgroundColor: "#C8922A",
  },
  bubbleText: {
    fontSize: 14,
    color: "#F1F5F9",
    lineHeight: 20,
  },
  headingText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F1F5F9",
    marginBottom: 4,
  },
  boldText: {
    fontWeight: "700",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    backgroundColor: "#111827",
    borderTopWidth: 1,
    borderTopColor: "#1E2D45",
  },
  input: {
    flex: 1,
    backgroundColor: "#1A2235",
    borderWidth: 1,
    borderColor: "#1E2D45",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#F1F5F9",
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: "#C8922A",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    backgroundColor: "#1A2235",
  },
  sendIcon: {
    color: "#fff",
    fontSize: 16,
  },
});
