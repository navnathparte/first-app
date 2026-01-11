import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Countdown every second
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // After countdown, go to welcome page
      router.replace("/welcome");
    }
  }, [countdown]);

  return (
    <View style={styles.container}>
      <Text style={styles.countdown}>{countdown}</Text>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  countdown: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#94a3b8",
  },
});
