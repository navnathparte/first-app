import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { useRouter } from "expo-router";

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Welcome, Mr Parte! 👋
      </Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>🎮</Text>
          <Text style={styles.cardTitle}>Quick Play</Text>
          <Text style={styles.cardDesc}>Start a quick game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>🌐</Text>
          <Text style={styles.cardTitle}>Multiplayer</Text>
          <Text style={styles.cardDesc}>Play with friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>🏆</Text>
          <Text style={styles.cardTitle}>Leaderboard</Text>
          <Text style={styles.cardDesc}>View top players</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>📊</Text>
          <Text style={styles.cardTitle}>Statistics</Text>
          <Text style={styles.cardDesc}>Your game stats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 15,
    width: "47%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
  },
});