import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const slides = [
  {
    id: "1",
    icon: "⚖️",
    title: "Know Your Rights",
    subtitle:
      "Get instant answers to legal questions based on Nigerian law — anytime, anywhere.",
  },
  {
    id: "2",
    icon: "🗣️",
    title: "Ask in Pidgin or English",
    subtitle:
      "No big grammar needed. Talk the way you talk, we go understand you.",
  },
  {
    id: "3",
    icon: "🔒",
    title: "Private & Confidential",
    subtitle:
      "Your conversations are private. We never share your information with anyone.",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = slides[currentIndex];
  const isLastSlide = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip button */}
      {!isLastSlide && (
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.icon}>{slide.icon}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>

      {/* Dots */}
      <View style={styles.dotsRow}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Next / Start button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {!isLastSlide ? "Next →" : "Start Using LexBot"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1E",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    gap: 20,
  },
  skipBtn: {
    alignSelf: "flex-end",
    marginBottom: 8,
    padding: 8,
  },
  skipText: {
    color: "#C8922A",
    fontSize: 15,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#1A2235",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E2D45",
    width: "100%",
  },
  icon: {
    fontSize: 56,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F1F5F9",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 22,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1E2D45",
  },
  dotActive: {
    width: 24,
    backgroundColor: "#C8922A",
  },
  button: {
    backgroundColor: "#C8922A",
    paddingVertical: 16,
    width: "100%",
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
