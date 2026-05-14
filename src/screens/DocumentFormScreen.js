import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateDocument } from "../utils/n8n";

export default function DocumentFormScreen({ navigation, route }) {
  const { type, icon, fields } = route.params || {};

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormComplete = fields.every((field) => formData[field].trim() !== "");

  const handleGenerate = async () => {
    if (!isFormComplete || submitting) return;

    setSubmitting(true);
    try {
      const data = await generateDocument({
        type,
        icon,
        fields,
        formData,
        language: "EN",
      });

      const documentText = data?.document || "Document could not be generated.";
      setGeneratedDocument(documentText);
      setSubmitted(true);
    } catch (error) {
      Alert.alert(
        "Generation Error",
        error.message || "Unable to generate document. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderFormattedDocument = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("### ")) {
        return (
          <Text key={index} style={styles.docHeading3}>
            {trimmed.replace("### ", "")}
          </Text>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <Text key={index} style={styles.docHeading2}>
            {trimmed.replace("## ", "")}
          </Text>
        );
      }

      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <Text key={index} style={styles.docBold}>
            {trimmed.replace(/\*\*/g, "")}
          </Text>
        );
      }

      if (trimmed === "") {
        return <View key={index} style={{ height: 8 }} />;
      }

      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <Text key={index} style={styles.documentText}>
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <Text key={i} style={styles.docInlineBold}>
                  {part.replace(/\*\*/g, "")}
                </Text>
              );
            }
            return part;
          })}
        </Text>
      );
    });
  };

  const handleDownload = async () => {
    try {
      const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Georgia, serif; padding: 40px; color: #111; line-height: 1.6; }
            h1 { text-align: center; font-size: 20px; margin-bottom: 4px; }
            h2 { font-size: 15px; font-weight: bold; margin-top: 20px; text-transform: uppercase; }
            h3 { font-size: 14px; color: #555; margin-top: 16px; }
            p { font-size: 13px; margin: 6px 0; }
            .date { text-align: center; color: #888; font-size: 12px; margin-bottom: 24px; }
            .disclaimer { border-top: 1px solid #ccc; margin-top: 30px; padding-top: 12px; font-size: 11px; color: #888; }
          </style>
        </head>
        <body>
          <h1>${icon} ${type}</h1>
          <p class="date">Generated: ${new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>
          ${generatedDocument
            .split("\n")
            .map((line) => {
              const trimmed = line.trim();
              if (trimmed.startsWith("### "))
                return `<h3>${trimmed.replace("### ", "")}</h3>`;
              if (trimmed.startsWith("## "))
                return `<h2>${trimmed.replace("## ", "")}</h2>`;
              if (trimmed.startsWith("**") && trimmed.endsWith("**"))
                return `<h2>${trimmed.replace(/\*\*/g, "")}</h2>`;
              if (trimmed === "") return "<br/>";
              return `<p>${trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
            })
            .join("")}
        </body>
      </html>
    `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: `Share ${type}`,
        UTI: "com.adobe.pdf",
      });
    } catch (_error) {
      Alert.alert("Error", "Could not download document as PDF.");
    }
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {icon} {type}
          </Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.previewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>
              {icon} {type}
            </Text>
            <Text style={styles.previewDate}>
              Generated:{" "}
              {new Date().toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
            <View style={styles.previewDivider} />
            <View>{renderFormattedDocument(generatedDocument)}</View>
          </View>

          <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
            <Text style={styles.downloadBtnText}>⬇️ Download Document</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newDocBtn}
            onPress={() => {
              setSubmitted(false);
              setGeneratedDocument("");
              setFormData(
                fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
              );
            }}
          >
            <Text style={styles.newDocBtnText}>Generate Another Document</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.lawyerBtn}
            onPress={() => navigation.navigate("Lawyers")}
          >
            <Text style={styles.lawyerBtnText}>👨‍⚖️ Find a Lawyer to Review</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {icon} {type}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formIntro}>
            Fill in the details below. All fields are required.
          </Text>

          {fields.map((field, index) => (
            <View key={index} style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{field}</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder={`Enter ${field.toLowerCase()}...`}
                placeholderTextColor="#64748B"
                value={formData[field]}
                onChangeText={(value) => updateField(field, value)}
              />
            </View>
          ))}

          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              {fields.filter((f) => formData[f].trim() !== "").length} of{" "}
              {fields.length} fields completed
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(fields.filter((f) => formData[f].trim() !== "").length / fields.length) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.generateBtn,
              (!isFormComplete || submitting) && styles.generateBtnDisabled,
            ]}
            onPress={handleGenerate}
            disabled={!isFormComplete || submitting}
            activeOpacity={0.85}
          >
            <Text style={styles.generateBtnText}>
              {submitting
                ? "✨ Generating document..."
                : isFormComplete
                  ? "📄 Generate Document"
                  : "Complete all fields to generate"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    fontSize: 16,
    fontWeight: "800",
    color: "#F1F5F9",
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  formIntro: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#F1F5F9",
    letterSpacing: 0.3,
  },
  fieldInput: {
    backgroundColor: "#1A2235",
    borderWidth: 1,
    borderColor: "#1E2D45",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#F1F5F9",
  },
  progressRow: {
    gap: 8,
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#64748B",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#1E2D45",
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#C8922A",
    borderRadius: 2,
  },
  generateBtn: {
    backgroundColor: "#C8922A",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    elevation: 8,
    marginTop: 8,
  },
  generateBtnDisabled: {
    backgroundColor: "#1A2235",
    elevation: 0,
  },
  generateBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  previewContainer: {
    padding: 20,
    gap: 14,
  },
  previewCard: {
    backgroundColor: "#1A2235",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1E2D45",
    gap: 12,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#F1F5F9",
    textAlign: "center",
  },
  previewDate: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  previewDivider: {
    height: 1,
    backgroundColor: "#1E2D45",
    marginVertical: 4,
  },
  documentText: {
    fontSize: 13,
    color: "#F1F5F9",
    lineHeight: 22,
  },
  docHeading2: {
    fontSize: 16,
    fontWeight: "800",
    color: "#F1F5F9",
    marginTop: 12,
    marginBottom: 4,
  },
  docHeading3: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C8922A",
    marginTop: 10,
    marginBottom: 2,
  },
  docBold: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F1F5F9",
    marginTop: 6,
  },
  docInlineBold: {
    fontWeight: "700",
    color: "#F1F5F9",
  },
  downloadBtn: {
    backgroundColor: "#C8922A",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    elevation: 4,
  },
  downloadBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  newDocBtn: {
    backgroundColor: "#1A2235",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  newDocBtnText: {
    color: "#F1F5F9",
    fontSize: 14,
    fontWeight: "600",
  },
  lawyerBtn: {
    backgroundColor: "rgba(200, 146, 42, 0.1)",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(200, 146, 42, 0.3)",
  },
  lawyerBtnText: {
    color: "#C8922A",
    fontSize: 14,
    fontWeight: "600",
  },
});
