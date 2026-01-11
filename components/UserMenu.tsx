import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.user}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.name}>Parte</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <Text>Profile</Text>
          <Text>Logout</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  icon: { fontSize: 20 },
  name: { marginLeft: 6 },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
});
