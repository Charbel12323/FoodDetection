import { StyleSheet } from "react-native"

const headerStyles = StyleSheet.create({
  headerGradient: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
  },
  decorativeCircle: {
    position: "absolute",
    top: -150,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorativeCircleSmall: {
    position: "absolute",
    bottom: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  logoTextHighlight: {
    fontWeight: "800",
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  welcomeSubtext: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 6,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  cardIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardTitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
})

export default headerStyles

