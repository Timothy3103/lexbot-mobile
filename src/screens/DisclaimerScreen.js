import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DisclaimerScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Important Notice</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card */}
        <View style={styles.card}>
          {/* Warning icon */}
          <Text style={styles.warningIcon}>⚠️</Text>

          {/* Card title */}
          <Text style={styles.cardTitle}>LexBot is Not a Lawyer</Text>

          {/* Paragraph 1 */}
          <Text style={styles.paragraph}>
            LexBot provides general legal{" "}
            <Text style={styles.bold}>information</Text> based on Nigerian
            statutes and publicly available legal resources. It does{" "}
            <Text style={styles.bold}>not</Text> constitute legal advice and
            should not be relied upon as a substitute for professional legal
            counsel.
          </Text>

          {/* Paragraph 2 */}
          <Text style={styles.paragraph}>
            For serious legal matters — including criminal cases, property
            disputes, or family law — always consult a qualified Nigerian lawyer
            or contact the nearest Legal Aid Council office.
          </Text>

          {/* Sources */}
          <View style={styles.sourcesBox}>
            <Text style={styles.sourcesLabel}>Sources Referenced</Text>
            <Text style={styles.sourcesText}>
              • Constitution of the Federal Republic of Nigeria 1999{"\n"}•
              Labour Act Cap L1 LFN 2004{"\n"}• Land Use Act{"\n"}•
              Administration of Criminal Justice Act (ACJA) 2015{"\n"}•
              Companies and Allied Matters Act (CAMA){"\n"}• Rent Control and
              Recovery of Residential Premises Act
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>I Understand</Text>
        </TouchableOpacity>
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
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#1A2235",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1E2D45",
    gap: 16,
    alignItems: "center",
  },
  warningIcon: {
    fontSize: 48,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#F1F5F9",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 22,
    textAlign: "left",
    alignSelf: "stretch",
  },
  bold: {
    fontWeight: "700",
    color: "#F1F5F9",
  },
  sourcesBox: {
    backgroundColor: "#0A0F1E",
    borderRadius: 12,
    padding: 16,
    alignSelf: "stretch",
    gap: 8,
  },
  sourcesLabel: {
    fontSize: 11,
    color: "#C8922A",
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sourcesText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#C8922A",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
