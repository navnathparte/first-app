import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function ScreenLoader() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#38bdf8" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
});
