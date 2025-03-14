// styles/LoginScreenStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    padding: 8,
    alignSelf: "flex-start",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
  },
  formContainer: {
    width: "100%",
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  formSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  inputsContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  inputIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    height: 50,
    justifyContent: "center",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
  },
  authButton: {
    backgroundColor: "#2563EB",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  authButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  messageText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
  },
  switchModeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  switchModeText: {
    fontSize: 14,
    marginRight: 4,
  },
  switchModeLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
