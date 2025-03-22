// styles/AppStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8D9", // Or any background color you'd like
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row", // Align logo, title, and button horizontally
    justifyContent: "space-between", // This ensures the space between the items
    alignItems: "center", // Align vertically centered
    paddingHorizontal: 20, // Adjust padding as needed
    paddingVertical: 10,
  },
  logoContainer: {
    flexDirection: "row", // Keep logo and title in one row
    alignItems: "center",
  },
  logoImage: {
    width: 40, // Size for logo image, adjust as needed
    height: 40,
    marginRight: 10, // Space between logo and title
  },
  logoText: {
    fontSize: 24, // Adjust the size of the title
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  headerButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  heroSection: {
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 350,
  },
  heroContent: {
    width: "100%",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 16,
    lineHeight: 40,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  heroCta: {
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  heroImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: width * 0.8,
    height: 500,
    borderRadius: 20,
  },
  featuresSection: {
    padding: 20,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  howItWorksSection: {
    padding: 20,
    marginTop: 40,
  },
  stepsContainer: {
    marginTop: 24,
  },
  stepCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: "700",
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  testimonialsSection: {
    padding: 20,
    marginTop: 40,
  },
  testimonialsContainer: {
    paddingRight: 20,
  },
  testimonialCard: {
    width: width * 0.75,
    padding: 20,
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialQuote: {
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: 16,
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: "600",
  },
  testimonialRole: {
    fontSize: 14,
  },
  ctaSection: {
    padding: 30,
    marginTop: 40,
    borderRadius: 16,
    marginHorizontal: 20,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 8,
  },
  footer: {
    padding: 20,
    marginTop: 60,
    alignItems: "center",
  },
  footerTop: {
    alignItems: "center",
    marginBottom: 24,
  },
  footerLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  footerLogoText: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
  footerTagline: {
    fontSize: 14,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  footerLink: {
    marginHorizontal: 12,
    fontSize: 14,
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
  },
});
