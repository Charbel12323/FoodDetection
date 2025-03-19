// // styles/LoginScreenStyles.js
// import { StyleSheet } from "react-native";

// export default StyleSheet.create({
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },
//   backButton: {
//     padding: 8,
//     alignSelf: "flex-start",
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   logoText: {
//     fontSize: 28,
//     fontWeight: "700",
//     marginTop: 12,
//   },
//   formContainer: {
//     width: "100%",
//   },
//   formTitle: {
//     fontSize: 28,
//     fontWeight: "700",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   formSubtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 32,
//   },
//   inputsContainer: {
//     marginBottom: 24,
//   },
//   inputWrapper: {
//     marginBottom: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   inputIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     fontSize: 16,
//   },
//   passwordToggle: {
//     position: "absolute",
//     right: 16,
//     height: 50,
//     justifyContent: "center",
//   },
//   forgotPasswordContainer: {
//     alignItems: "flex-end",
//     marginTop: 8,
//   },
//   forgotPasswordText: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   authButton: {
//     backgroundColor: "#2563EB",
//     height: 56,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//   },
//   authButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   messageText: {
//     textAlign: "center",
//     marginBottom: 16,
//     fontSize: 14,
//   },
//   switchModeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   switchModeText: {
//     fontSize: 14,
//     marginRight: 4,
//   },
//   switchModeLink: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });
/// styles/Login.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8D9", // Light cream background
    width: "100%",
  },
  headerSection: {
    backgroundColor: "#FFF8D9", // Yellow background
    padding: 20,
    width: "100%",
  },
  formFieldsSection: {
    backgroundColor: "#B9C5A9", // Muted green color
    padding: 20,
    paddingBottom: 30,
    width: "100%",
    borderTopLeftRadius: 30,  // Adjust as needed
    borderTopRightRadius: 30, // Adjust as needed
    overflow: "hidden", // Ensures children don't overflow rounded corners
},

  formTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#373737",
    textAlign: "center",
  },
  formSubtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
    textAlign: "center",
  },
  inputsContainer: {
    width: "40%",
    alignSelf: "center"
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#373737",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    height: 48,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 24, // Pill shape
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
    color: "#373737",
    width: "100%",
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  forgotPasswordContainer: {
    alignSelf: "center",
    marginVertical: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#373737",
    textDecorationLine: "underline",
  },
  authButton: {
    backgroundColor: "#373737", // Dark gray/black button
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    width: "100%",
  },
  authButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  messageText: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 14,
    color: "#EF4444",
  },
  switchModeContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  switchModeText: {
    fontSize: 14,
    color: "#373737",
  },
  switchModeLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#373737",
    textDecorationLine: "underline",
  },
});