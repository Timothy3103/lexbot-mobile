import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const documents = [
  {
    icon: "📋",
    title: "Tenancy Agreement",
    desc: "A legally structured rental agreement between landlord and tenant",
    fields: [
      "Landlord Name",
      "Tenant Name",
      "Property Address",
      "Monthly Rent",
      "Duration",
    ],
  },
  {
    icon: "✉️",
    title: "Demand Letter",
    desc: "A formal letter demanding payment, action or compliance from another party",
    fields: [
      "Your Name",
      "Recipient Name",
      "Amount Owed",
      "Reason",
      "Deadline",
    ],
  },
  {
    icon: "💼",
    title: "Employment Offer Letter",
    desc: "A formal offer of employment outlining role, salary and start date",
    fields: [
      "Company Name",
      "Employee Name",
      "Job Title",
      "Salary",
      "Start Date",
    ],
  },
  {
    icon: "🚪",
    title: "Eviction Notice",
    desc: "A formal notice requiring a tenant to vacate a property",
    fields: [
      "Landlord Name",
      "Tenant Name",
      "Property Address",
      "Reason",
      "Vacate Date",
    ],
  },
  {
    icon: "🤝",
    title: "Simple Service Agreement",
    desc: "A basic contract between a service provider and a client",
    fields: [
      "Provider Name",
      "Client Name",
      "Service Description",
      "Fee",
      "Duration",
    ],
  },
];

export default function DocumentsScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Generate a Document</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {/* Intro */}
        <Text style={styles.intro}>
          Select a document type. We'll guide you through the details step by
          step.
        </Text>

        {/* Document cards */}
        {documents.map((doc, index) => (
          <TouchableOpacity
            key={index}
            style={styles.docCard}
            onPress={() =>
              navigation.navigate("DocumentForm", {
                type: doc.title,
                icon: doc.icon,
                fields: doc.fields,
              })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.docIcon}>{doc.icon}</Text>
            <View style={styles.docInfo}>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.docDesc}>{doc.desc}</Text>
              <Text style={styles.docFields}>
                {doc.fields.length} fields required
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Note */}
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            📌 These templates are for guidance only. Always have important
            documents reviewed by a qualified Nigerian lawyer before signing.
          </Text>
        </View>
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
    padding: 20,
    gap: 12,
  },
  intro: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 4,
  },
  docCard: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  docIcon: {
    fontSize: 32,
  },
  docInfo: {
    flex: 1,
    gap: 3,
  },
  docTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  docDesc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
  },
  docFields: {
    fontSize: 11,
    color: "#C8922A",
    fontWeight: "600",
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    color: "#64748B",
  },
  noteBox: {
    backgroundColor: "rgba(200, 146, 42, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(200, 146, 42, 0.2)",
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
  },
  noteText: {
    fontSize: 12,
    color: "#E5B04A",
    lineHeight: 18,
  },
});
