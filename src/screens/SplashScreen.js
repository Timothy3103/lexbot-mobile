import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  // Each element gets its own animation value
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Logo fades in and scales up
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),

      // 2. Title slides up and fades in
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // 3. Tagline and divider fade in
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),

      // 4. Button slides up and fades in
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttonY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.glowOuter} />
      <View style={styles.glowInner} />

      {/* Logo animates: fade + scale */}
      <Animated.Text
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        ⚖️
      </Animated.Text>

      {/* Title animates: fade + slide up */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleY }],
          },
        ]}
      >
        LexBot
      </Animated.Text>

      {/* Tagline and divider fade in together */}
      <Animated.Text style={[styles.tagline, { opacity: contentOpacity }]}>
        Your Nigerian Legal Guide
      </Animated.Text>

      <Animated.View style={[styles.divider, { opacity: contentOpacity }]} />

      {/* Button slides up and fades in */}
      <Animated.View
        style={{
          opacity: buttonOpacity,
          transform: [{ translateY: buttonY }],
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Onboarding")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.Text style={[styles.footerNote, { opacity: contentOpacity }]}>
        Powered by AI · Grounded in Nigerian Law
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1E",
    alignItems: "center",
    justifyContent: "center",
  },
  glowOuter: {
    position: "absolute",
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(200, 146, 42, 0.06)",
    top: height * 0.05,
    alignSelf: "center",
  },
  glowInner: {
    position: "absolute",
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: width * 0.325,
    backgroundColor: "rgba(200, 146, 42, 0.07)",
    top: height * 0.1,
    alignSelf: "center",
  },
  logo: {
    fontSize: 72,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#C8922A",
    letterSpacing: 3,
    marginTop: 12,
  },
  tagline: {
    fontSize: 14,
    color: "#64748B",
    letterSpacing: 1.5,
    marginTop: 8,
    textTransform: "uppercase",
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: "#C8922A",
    borderRadius: 2,
    marginTop: 20,
    opacity: 0.5,
  },
  button: {
    backgroundColor: "#C8922A",
    paddingVertical: 16,
    paddingHorizontal: 56,
    borderRadius: 50,
    marginTop: 40,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footerNote: {
    position: "absolute",
    bottom: 40,
    fontSize: 11,
    color: "#1E2D45",
    letterSpacing: 0.5,
  },
});
