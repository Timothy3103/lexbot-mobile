import { useState } from "react";
import {
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

export default function DocumentFormScreen({ navigation, route }) {
  const { type, icon, fields } = route.params || {};

  // Dynamically create state for each field
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
  );
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormComplete = fields.every((field) => formData[field].trim() !== "");

  const handleGenerate = () => {
    if (!isFormComplete) return;
    setSubmitted(true);
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
              Date:{" "}
              {new Date().toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>

            <View style={styles.previewDivider} />

            {fields.map((field, index) => (
              <View key={index} style={styles.previewRow}>
                <Text style={styles.previewLabel}>{field}:</Text>
                <Text style={styles.previewValue}>{formData[field]}</Text>
              </View>
            ))}

            <View style={styles.previewDivider} />

            <Text style={styles.previewDisclaimer}>
              ⚠️ This document is generated for guidance purposes only and does
              not constitute legal advice. Please have it reviewed by a
              qualified Nigerian lawyer before use.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.newDocBtn}
            onPress={() => navigation.goBack()}
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
      {/* Header */}
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

          {/* Form fields */}
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

          {/* Progress indicator */}
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

          {/* Generate button */}
          <TouchableOpacity
            style={[
              styles.generateBtn,
              !isFormComplete && styles.generateBtnDisabled,
            ]}
            onPress={handleGenerate}
            disabled={!isFormComplete}
            activeOpacity={0.85}
          >
            <Text style={styles.generateBtnText}>
              {isFormComplete
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
  previewRow: {
    gap: 4,
  },
  previewLabel: {
    fontSize: 11,
    color: "#C8922A",
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  previewValue: {
    fontSize: 14,
    color: "#F1F5F9",
    lineHeight: 20,
  },
  previewDisclaimer: {
    fontSize: 12,
    color: "#E5B04A",
    lineHeight: 18,
    marginTop: 4,
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
