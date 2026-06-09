import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    clearAllHistory,
    deleteChatSession,
    getChatHistory,
} from "../utils/chatHistory";

export default function ChatHistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, []),
  );

  const loadHistory = async () => {
    const data = await getChatHistory();
    setHistory(data);
  };

  const handleDelete = (sessionId) => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteChatSession(sessionId);
          loadHistory();
        },
      },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All History",
      "Are you sure you want to delete all chat history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            await clearAllHistory();
            setHistory([]);
          },
        },
      ],
    );
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() =>
        navigation.navigate("Chat", {
          topic: item.topic === "General" ? null : item.topic,
          icon: item.icon,
          restoredMessages: item.messages,
        })
      }
      activeOpacity={0.8}
    >
      <View style={styles.sessionLeft}>
        <Text style={styles.sessionIcon}>{item.icon}</Text>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTopic}>{item.topic}</Text>
          <Text style={styles.sessionPreview} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          <Text style={styles.sessionDate}>{formatDate(item.updatedAt)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteBtnText}>🗑</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat History</Text>
        {history.length > 0 ? (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 60 }} />
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyTitle}>No chat history yet</Text>
          <Text style={styles.emptyDesc}>
            Your past conversations will appear here
          </Text>
          <TouchableOpacity
            style={styles.startChatBtn}
            onPress={() => navigation.navigate("Chat", { topic: null })}
          >
            <Text style={styles.startChatBtnText}>Start a Conversation</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0F1E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1E2D45",
  },
  backBtn: {
    width: 40,
    padding: 4,
  },
  backText: {
    fontSize: 24,
    color: "#C8922A",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F1F5F9",
  },
  clearAllText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
    width: 60,
    textAlign: "right",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  sessionCard: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E2D45",
    gap: 12,
  },
  sessionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sessionIcon: {
    fontSize: 32,
  },
  sessionInfo: {
    flex: 1,
    gap: 3,
  },
  sessionTopic: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  sessionPreview: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
  },
  sessionDate: {
    fontSize: 11,
    color: "#C8922A",
    fontWeight: "600",
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
  },
  deleteBtnText: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  emptyDesc: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  startChatBtn: {
    backgroundColor: "#C8922A",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    marginTop: 8,
  },
  startChatBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
