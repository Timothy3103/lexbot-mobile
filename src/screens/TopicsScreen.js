import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const topics = [
  {
    icon: "🏠",
    title: "Tenancy & Housing",
    desc: "Rent disputes, eviction rights, tenancy agreements",
  },
  {
    icon: "💼",
    title: "Employment Rights",
    desc: "Wrongful termination, unpaid wages, contracts",
  },
  {
    icon: "🚔",
    title: "Criminal Rights",
    desc: "Arrest rights, bail, police conduct",
  },
  {
    icon: "🏢",
    title: "Business & CAMA",
    desc: "Company registration, contracts, disputes",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Law",
    desc: "Marriage, divorce, child custody",
  },
  {
    icon: "🌍",
    title: "Land & Property",
    desc: "Land Use Act, title disputes, ownership",
  },
  {
    icon: "🏥",
    title: "Healthcare Rights",
    desc: "Patient rights, medical negligence",
  },
  {
    icon: "🎓",
    title: "Education Rights",
    desc: "Student rights, school disputes",
  },
];

export default function TopicsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal Topics</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={styles.topicRow}
            onPress={() =>
              navigation.navigate("Chat", {
                topic: topic.title,
                icon: topic.icon,
              })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.topicIcon}>{topic.icon}</Text>
            <View style={styles.topicInfo}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDesc}>{topic.desc}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    width: 32,
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
  list: {
    padding: 16,
    gap: 10,
  },
  topicRow: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  topicIcon: {
    fontSize: 28,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F1F5F9",
    marginBottom: 3,
  },
  topicDesc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
  },
  arrow: {
    fontSize: 22,
    color: "#64748B",
  },
});
