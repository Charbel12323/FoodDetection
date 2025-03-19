// import { StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const InventoryStyles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F9FAFB",
//     flex: 1,
//   },
//   profileButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchContainer: {
//     paddingHorizontal: 16,
//     marginTop: -20,
//     marginBottom: 10,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1F2937",
//   },
//   ingredientsList: {
//     padding: 16,
//     paddingBottom: 80,
//   },
//   ingredientCard: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 12,
//     alignItems: "center",
//     justifyContent: "space-between",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   ingredientName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1F2937",
//   },
//   deleteButton: {
//     padding: 8,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 60,
//   },
//   loadingText: {
//     fontSize: 18,
//     color: "#374151",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 60,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#6B7280",
//     marginTop: 16,
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     marginTop: 4,
//   },
// });

// export default InventoryStyles;
// styles/InventoryPage.js
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const InventoryStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    flex: 1,
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#10B981",
  },
  categoryText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  expiringItemsContainer: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  expiringItem: {
    alignItems: "center",
    marginRight: 12,
    width: 60,
  },
  expiringImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    position: "relative",
  },
  expiringInitial: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  expiringName: {
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
  },
  expiryBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#F59E0B",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  expiryBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  emptyExpiringContainer: {
    width: width - 32,
    paddingVertical: 12,
    alignItems: "center",
  },
  emptyExpiringText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  statCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#10B981",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  ingredientsList: {
    padding: 16,
    paddingBottom: 80,
  },
  newIngredientCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  ingredientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  ingredientInitial: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
  },
  ingredientNameNew: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  expiryText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginHorizontal: 12,
    width: 20,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 18,
    color: "#374151",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  // Maintain your original styles for compatibility
  ingredientCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 32,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default InventoryStyles;