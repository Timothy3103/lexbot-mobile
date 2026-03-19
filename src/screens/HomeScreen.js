import { useState } from "react";
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
    desc: "Rent disputes, eviction rights",
  },
  {
    icon: "💼",
    title: "Employment Rights",
    desc: "Wages, contracts, dismissal",
  },
  {
    icon: "🚔",
    title: "Criminal Rights",
    desc: "Arrest, bail, police conduct",
  },
  { icon: "🏢", title: "Business & CAMA", desc: "Registration, contracts" },
  { icon: "👨‍👩‍👧", title: "Family Law", desc: "Marriage, divorce, custody" },
  { icon: "🌍", title: "Land & Property", desc: "Land Use Act, ownership" },
];

const navItems = [
  { icon: "🏠", label: "Home", screen: "Home" },
  { icon: "💬", label: "Ask", screen: "Chat" },
  { icon: "📚", label: "Topics", screen: "Topics" },
  { icon: "📄", label: "Docs", screen: "Documents" },
  { icon: "👨‍⚖️", label: "Lawyers", screen: "Lawyers" },
];

export default function HomeScreen({ navigation }) {
  const [lang, setLang] = useState("EN");
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.container}>
          {/* ── HEADER ── */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good day 👋</Text>
              <Text style={styles.title}>How can LexBot help?</Text>
            </View>
            <View style={styles.langToggle}>
              <TouchableOpacity
                style={[styles.langBtn, lang === "EN" && styles.langBtnActive]}
                onPress={() => setLang("EN")}
              >
                <Text
                  style={[
                    styles.langText,
                    lang === "EN" && styles.langTextActive,
                  ]}
                >
                  EN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langBtn, lang === "PID" && styles.langBtnActive]}
                onPress={() => setLang("PID")}
              >
                <Text
                  style={[
                    styles.langText,
                    lang === "PID" && styles.langTextActive,
                  ]}
                >
                  PID
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── ASK BAR ── */}
          <TouchableOpacity
            style={styles.askBar}
            onPress={() => navigation.navigate("Chat", { topic: null })}
            activeOpacity={0.8}
          >
            <Text style={styles.askIcon}>💬</Text>
            <Text style={styles.askPlaceholder}>
              {lang === "EN"
                ? "Ask a legal question..."
                : "Ask your question for Pidgin..."}
            </Text>
            <Text style={styles.askArrow}>→</Text>
          </TouchableOpacity>

          {/* ── PILLAR 1: UNDERSTAND ── */}
          <View style={styles.pillarHeader}>
            <View style={styles.pillarBadge}>
              <Text style={styles.pillarBadgeText}>① Understand</Text>
            </View>
            <Text style={styles.pillarSub}>Know your rights</Text>
          </View>

          <View style={styles.topicsGrid}>
            {topics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCard}
                onPress={() =>
                  navigation.navigate("Chat", {
                    topic: topic.title,
                    icon: topic.icon,
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.topicIcon}>{topic.icon}</Text>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc}>{topic.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => navigation.navigate("Topics")}
          >
            <Text style={styles.viewAllText}>View all topics →</Text>
          </TouchableOpacity>

          {/* ── PILLAR 2: ACT ── */}
          <View style={styles.pillarHeader}>
            <View style={[styles.pillarBadge, styles.pillarBadgeAct]}>
              <Text style={styles.pillarBadgeText}>② Act</Text>
            </View>
            <Text style={styles.pillarSub}>Take the next step</Text>
          </View>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("Documents")}
            activeOpacity={0.8}
          >
            <View style={styles.actionCardLeft}>
              <Text style={styles.actionCardIcon}>📄</Text>
              <View>
                <Text style={styles.actionCardTitle}>Generate a Document</Text>
                <Text style={styles.actionCardDesc}>
                  Create tenancy agreements, demand letters, employment letters
                  and more
                </Text>
              </View>
            </View>
            <Text style={styles.actionCardArrow}>›</Text>
          </TouchableOpacity>

          {/* ── PILLAR 3: ESCALATE ── */}
          <View style={styles.pillarHeader}>
            <View style={[styles.pillarBadge, styles.pillarBadgeEscalate]}>
              <Text style={styles.pillarBadgeText}>③ Escalate</Text>
            </View>
            <Text style={styles.pillarSub}>Get professional help</Text>
          </View>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("Lawyers")}
            activeOpacity={0.8}
          >
            <View style={styles.actionCardLeft}>
              <Text style={styles.actionCardIcon}>👨‍⚖️</Text>
              <View>
                <Text style={styles.actionCardTitle}>Find a Lawyer</Text>
                <Text style={styles.actionCardDesc}>
                  Connect with verified Nigerian lawyers by state and specialty
                </Text>
              </View>
            </View>
            <Text style={styles.actionCardArrow}>›</Text>
          </TouchableOpacity>

          {/* ── DISCLAIMER ── */}
          <TouchableOpacity
            style={styles.disclaimerBanner}
            onPress={() => navigation.navigate("Disclaimer")}
            activeOpacity={0.8}
          >
            <Text style={styles.disclaimerText}>
              ⚠️ LexBot provides legal{" "}
              <Text style={styles.disclaimerBold}>information</Text>, not legal{" "}
              <Text style={styles.disclaimerBold}>advice</Text>. Tap to learn
              more.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── BOTTOM NAV ── */}
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.navItem}
            onPress={() => {
              setActiveNav(item.screen);
              if (item.screen === "Chat") {
                navigation.navigate("Chat", { topic: null });
              } else {
                navigation.navigate(item.screen);
              }
            }}
          >
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.navLabel,
                activeNav === item.screen && styles.navLabelActive,
              ]}
            >
              {item.label}
            </Text>
            {activeNav === item.screen && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0F1E",
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 24,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 13,
    color: "#64748B",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F1F5F9",
    marginTop: 2,
  },
  langToggle: {
    flexDirection: "row",
    backgroundColor: "#1A2235",
    borderRadius: 20,
    padding: 3,
    gap: 2,
  },
  langBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  langBtnActive: {
    backgroundColor: "#C8922A",
  },
  langText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },
  langTextActive: {
    color: "#fff",
  },
  askBar: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  askIcon: {
    fontSize: 18,
  },
  askPlaceholder: {
    flex: 1,
    color: "#64748B",
    fontSize: 14,
  },
  askArrow: {
    color: "#C8922A",
    fontSize: 18,
    fontWeight: "700",
  },
  pillarHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  pillarBadge: {
    backgroundColor: "rgba(200, 146, 42, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(200, 146, 42, 0.3)",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  pillarBadgeAct: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  pillarBadgeEscalate: {
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  pillarBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  pillarSub: {
    fontSize: 12,
    color: "#64748B",
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  topicCard: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1E2D45",
    width: "47.5%",
  },
  topicIcon: {
    fontSize: 26,
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 13,
    color: "#F1F5F9",
    fontWeight: "700",
    marginBottom: 4,
  },
  topicDesc: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 16,
  },
  viewAllBtn: {
    alignSelf: "flex-end",
  },
  viewAllText: {
    fontSize: 12,
    color: "#C8922A",
    fontWeight: "600",
  },
  actionCard: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  actionCardLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  actionCardIcon: {
    fontSize: 32,
  },
  actionCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F1F5F9",
    marginBottom: 4,
  },
  actionCardDesc: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 16,
    maxWidth: 200,
  },
  actionCardArrow: {
    fontSize: 24,
    color: "#64748B",
  },
  disclaimerBanner: {
    backgroundColor: "rgba(200, 146, 42, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(200, 146, 42, 0.2)",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#E5B04A",
    lineHeight: 18,
  },
  disclaimerBold: {
    fontWeight: "700",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderTopWidth: 1,
    borderTopColor: "#1E2D45",
    paddingTop: 10,
    paddingBottom: 16,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 10,
    color: "#64748B",
  },
  navLabelActive: {
    color: "#C8922A",
  },
  navDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C8922A",
  },
});
