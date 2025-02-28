import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  ScanLine,
  ShoppingCart,
  Bell,
  BarChart4,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function App() {
  // Manual dark mode state
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Global background style
  const backgroundStyle = {
    backgroundColor: darkMode ? "#121212" : "#F9FAFB",
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.scrollContent}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <HeroSection darkMode={darkMode} />
        <FeaturesSection darkMode={darkMode} />
        <HowItWorksSection darkMode={darkMode} />
        
        <Footer darkMode={darkMode} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({ darkMode, toggleDarkMode }) {
  return (
    <View style={[styles.header, { backgroundColor: darkMode ? "#111827" : "#E0F2FE" }]}>
      <View style={styles.logoContainer}>
        <ScanLine size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />
        <Text style={[styles.logoText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
          FridgeScan
        </Text>
      </View>
      <View style={styles.headerRight}>
       
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
    </View>
  );
}

function HeroSection({ darkMode }) {
  return (
    <View style={[styles.heroSection, { backgroundColor: darkMode ? "#1F2937" : "#F0F9FF" }]}>
      <View style={styles.heroContent}>
        <Text style={[styles.heroTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
          Never Forget What's In Your Fridge Again
        </Text>
        <Text style={[styles.heroSubtitle, { color: darkMode ? "#D1D5DB" : "#4B5563" }]}>
          Scan, track, and manage your food inventory with ease. Reduce waste and save money with smart expiration alerts.
        </Text>
        <View style={styles.heroCta}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, { borderColor: darkMode ? "#374151" : "#E5E7EB" }]}>
            <Text style={[styles.secondaryButtonText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     
    </View>
  );
}

function FeatureCard({ icon, title, description, darkMode }) {
  return (
    <View style={[styles.featureCard, { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF" }]}>
      <View style={[styles.featureIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
        {icon}
      </View>
      <Text style={[styles.featureTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>{title}</Text>
      <Text style={[styles.featureDescription, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>{description}</Text>
    </View>
  );
}

function FeaturesSection({ darkMode }) {
  return (
    <View style={styles.featuresSection}>
      <Text style={[styles.sectionTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
        Smart Features for Smart Kitchens
      </Text>
      <View style={styles.featuresGrid}>
        <FeatureCard
          icon={<ScanLine size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />}
          title="Quick Scanning"
          description="Scan barcodes or take photos to instantly add items to your inventory"
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<Bell size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />}
          title="Expiration Alerts"
          description="Get notified before your food expires to reduce waste"
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<ShoppingCart size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />}
          title="Shopping Lists"
          description="Automatically generate shopping lists based on what you need"
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<BarChart4 size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />}
          title="Consumption Insights"
          description="Track your food habits and spending with detailed analytics"
          darkMode={darkMode}
        />
      </View>
    </View>
  );
}

function StepCard({ number, title, description, darkMode }) {
  return (
    <View style={[styles.stepCard, { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF" }]}>
      <View style={[styles.stepNumber, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
        <Text style={[styles.stepNumberText, { color: darkMode ? "#60A5FA" : "#2563EB" }]}>{number}</Text>
      </View>
      <Text style={[styles.stepTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>{title}</Text>
      <Text style={[styles.stepDescription, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>{description}</Text>
    </View>
  );
}

function HowItWorksSection({ darkMode }) {
  return (
    <View style={styles.howItWorksSection}>
      <Text style={[styles.sectionTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>How It Works</Text>
      <View style={styles.stepsContainer}>
        <StepCard
          number="1"
          title="Scan Your Items"
          description="Use your camera to scan barcodes or take photos of your groceries"
          darkMode={darkMode}
        />
        <StepCard
          number="2"
          title="Organize Your Inventory"
          description="Items are automatically categorized and expiration dates are tracked"
          darkMode={darkMode}
        />
        <StepCard
          number="3"
          title="Get Smart Recommendations"
          description="Receive recipe ideas based on what's in your fridge"
          darkMode={darkMode}
        />
      </View>
    </View>
  );
}




function Footer({ darkMode }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerTop}>
        <View style={styles.footerLogoContainer}>
          <ScanLine size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
          <Text style={[styles.footerLogoText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>FridgeScan</Text>
        </View>
        <Text style={[styles.footerTagline, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
          Smart kitchen management at your fingertips
        </Text>
      </View>
      <View style={styles.footerLinks}>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>Contact Us</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.copyright, { color: darkMode ? "#9CA3AF" : "#9CA3AF" }]}>
        © {new Date().getFullYear()} FridgeScan. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
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
    alignItems: "center", // center everything horizontally
    justifyContent: "center",
    maxHeight: 350,
  },
  heroContent: {
    width: "100%",
    alignItems: "center", // center text and buttons
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
  },
  footerTop: {
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
