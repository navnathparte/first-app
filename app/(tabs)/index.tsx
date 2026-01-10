import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [countdown, setCountdown] = useState(10);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [countdown]);

  if (showWelcome) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Mr Parte</Text>
        <Text style={styles.countdown}>{countdown}</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerBlue}>
      <Text style={styles.titleWhite}>Welcome! 🎉</Text>
      <Text style={styles.subtitle}>Let's build something amazing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerBlue: {
    flex: 1,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  countdown: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ef4444",
  },
  titleWhite: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
});
