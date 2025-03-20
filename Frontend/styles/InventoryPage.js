
// import { StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const InventoryStyles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F9FAFB",
//     flex: 1,
//     paddingTop: 10,
//   },
//   header: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#F9FAFB",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1F2937",
//   },
//   searchContainer: {
//     paddingHorizontal: 16,
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
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1F2937",
//   },
//   categoriesContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   categoryButton: {
//     backgroundColor: "#F3F4F6",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 16,
//     marginRight: 8,
//   },
//   categoryButtonActive: {
//     backgroundColor: "#10B981",
//   },
//   categoryText: {
//     color: "#4B5563",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   categoryTextActive: {
//     color: "#FFFFFF",
//   },
//   section: {
//     marginTop: 16,
//     paddingHorizontal: 16,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#6B7280",
//     marginBottom: 8,
//   },
//   listTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1F2937",
//     marginTop: 16,
//     marginBottom: 8,
//     paddingHorizontal: 16,
//   },
//   expiringItemsContainer: {
//     paddingRight: 16,
//     paddingBottom: 8,
//   },
//   expiringItem: {
//     alignItems: "center",
//     marginRight: 12,
//     width: 60,
//   },
//   expiringImageContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#F3F4F6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 4,
//     position: "relative",
//   },
//   expiringInitial: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#6B7280",
//   },
//   expiringName: {
//     fontSize: 12,
//     color: "#4B5563",
//     textAlign: "center",
//   },
//   expiryBadge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#F59E0B",
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   expiryBadgeText: {
//     color: "#FFFFFF",
//     fontSize: 10,
//     fontWeight: "600",
//   },
//   emptyExpiringContainer: {
//     width: width - 32,
//     paddingVertical: 12,
//     alignItems: "center",
//   },
//   emptyExpiringText: {
//     fontSize: 14,
//     color: "#9CA3AF",
//   },
//   statsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 16,
//     marginTop: 8,
//     marginBottom: 8,
//   },
//   statCard: {
//     backgroundColor: "#F3F4F6",
//     borderRadius: 12,
//     padding: 12,
//     alignItems: "center",
//     flex: 1,
//     marginHorizontal: 2,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#10B981",
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: "#6B7280",
//   },
//   ingredientsList: {
//     padding: 16,
//     paddingBottom: 80,
//   },
//   newIngredientCard: {
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
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//   },
//   ingredientInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ingredientImageContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#F3F4F6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   ingredientInitial: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#6B7280",
//   },
//   ingredientNameNew: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1F2937",
//   },
//   expiryText: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginTop: 2,
//   },
//   quantityControls: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   quantityButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#F3F4F6",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1F2937",
//     marginHorizontal: 12,
//     width: 20,
//     textAlign: "center",
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
//   // Maintain your original styles for compatibility
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
//   addButton: {
//     position: "absolute",
//     bottom: 32,
//     right: 16,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: "#10B981",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
// });

// export default InventoryStyles;

import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const InventoryStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8D9",
    flex: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: -20,
    marginBottom: 8,
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
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#373737",
  },
  // Category filtering
  categoryContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryButtonActive: {
    backgroundColor: "#B9C5A9",
  },
  categoryText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  // Ingredients list
  ingredientsList: {
    padding: 16,
    paddingBottom: 100,
  },
  ingredientCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ingredientLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#373737",
  },
  ingredientMeta: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  ingredientRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  expirationContainer: {
    marginRight: 12,
  },
  expirationText: {
    fontSize: 14,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 18,
    color: "#373737",
  },
  // Empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#373737",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 32,
  },
  // Add button
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#B9C5A9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: width - 32,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#373737",
  },
  modalBody: {
    padding: 16,
    maxHeight: 500,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  textValue: {
    fontSize: 16,
    color: "#373737",
    fontWeight: "500",
    padding: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  pickerContainer: {
    marginTop: 8,
  },
  categoryPillsList: {
    paddingVertical: 4,
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: "#B9C5A9",
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryPillText: {
    fontSize: 14,
    color: "#6B7280",
  },
  categoryPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityInput: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#373737",
    marginHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  unitPillsList: {
    paddingVertical: 4,
  },
  unitPill: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  unitPillActive: {
    backgroundColor: "#B9C5A9",
  },
  unitPillText: {
    fontSize: 14,
    color: "#6B7280",
  },
  unitPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  macroColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  macroInput: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#373737",
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    marginTop: 8,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#B9C5A9",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  
  // Content container styles
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF8D9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80, // Provide space for the add button
  },
  
  // Additional styles you might need for the modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalBody: {
    maxHeight: '70%',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#9AAA8C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  
  // Styles for the quantity container
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  quantityButton: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#1F2937',
  },
  
  // Styles for the macro nutrients
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  macroColumn: {
    flex: 1,
    marginRight: 8,
  },
  macroInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  
  // Styles for the switch
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default InventoryStyles;