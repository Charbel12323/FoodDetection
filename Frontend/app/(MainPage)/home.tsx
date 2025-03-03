import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScanLine } from "lucide-react-native";

function Header() {
  return (
    <View style={[styles.header, { backgroundColor: "#111827" }]}>
      <View style={styles.logoContainer}>
        <ScanLine size={24} color= "#2563EB" />
        <Text style={[styles.logoText, { color:"#111827" }]}>
          FridgeScan
        </Text>
      </View>
      <View style={styles.headerRight}>
        {/* Add any header-right content (icons, toggle switches, etc.) here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
