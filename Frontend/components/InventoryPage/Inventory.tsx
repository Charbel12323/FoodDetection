// "use client"

// import React, { useState } from "react"
// import {
//   View,
//   Text,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Dimensions,
//   StatusBar,
//   Animated,
// } from "react-native"
// import { LinearGradient } from "expo-linear-gradient"
// import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"
// import headerStyles from "@/styles/InventoryHeader"
// import useIngredients from "@/hooks/useIngredients"
// import { deleteIngredient } from "@/api/ingredientService"
// import { useUserStore } from "@/stores/useUserStore"
// import InventoryStyles from "@/styles/InventoryPage"

// const { width } = Dimensions.get("window")

// const InventoryPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("")
//   const { ingredients, setIngredients, loading, fadeAnim, translateY } = useIngredients()
//   const userId = useUserStore((state) => state.user?.user_id)

//   const filteredIngredients = ingredients.filter((name: string) =>
//     name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const handleDeleteIngredient = async (ingredientName: string) => {
//     console.log("Delete pressed for:", ingredientName)
//     if (!userId) return
//     try {
//       await deleteIngredient(userId, ingredientName)
//       setIngredients((prev: string[]) => prev.filter((item) => item !== ingredientName))
//     } catch (error) {
//       console.error("Error deleting ingredient:", error)
//     }
//   }

//   const renderItem = ({ item }: { item: string }) => (
//     <View style={InventoryStyles.ingredientCard}>
//       <Text style={InventoryStyles.ingredientName}>{item}</Text>
//       <TouchableOpacity
//         onPress={() => handleDeleteIngredient(item)}
//         style={InventoryStyles.deleteButton}
//       >
//         <Feather name="trash-2" size={20} color="#EF4444" />
//       </TouchableOpacity>
//     </View>
//   )

//   return (
//     <SafeAreaView style={InventoryStyles.container} pointerEvents="auto">
//       <StatusBar barStyle="light-content" />

//       <LinearGradient
//         colors={["#10B981", "#059669"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={headerStyles.headerGradient}
//         pointerEvents="none"
//       >
//         <View style={headerStyles.decorativeCircle} />
//         <View style={headerStyles.decorativeCircleSmall} />

//         <View style={headerStyles.headerContent}>
//           <View style={headerStyles.logoContainer} />
//         </View>

//         <View style={headerStyles.welcomeContainer}>
//           <Text style={headerStyles.welcomeText}>Inventory</Text>
//           <Text style={headerStyles.welcomeSubtext}>Manage your ingredients</Text>
//         </View>
//       </LinearGradient>

//       <View style={InventoryStyles.searchContainer}>
//         <View style={InventoryStyles.searchBar}>
//           <Feather name="search" size={20} color="#9CA3AF" style={InventoryStyles.searchIcon} />
//           <TextInput
//             style={InventoryStyles.searchInput}
//             placeholder="Search ingredients..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#9CA3AF"
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery("")}> 
//               <Feather name="x" size={20} color="#9CA3AF" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {loading ? (
//         <View style={InventoryStyles.loadingContainer}>
//           <Text style={InventoryStyles.loadingText}>Loading ingredients...</Text>
//         </View>
//       ) : (
//         <Animated.View
//           style={{ opacity: fadeAnim, transform: [{ translateY }] }}
//           pointerEvents="auto"
//         >
//           <FlatList
//             data={filteredIngredients}
//             renderItem={renderItem}
//             keyExtractor={(_, index) => index.toString()}
//             contentContainerStyle={InventoryStyles.ingredientsList}
//             showsVerticalScrollIndicator={true}
//             ListEmptyComponent={
//               <View style={InventoryStyles.emptyContainer}>
//                 <MaterialCommunityIcons name="food-off" size={60} color="#D1D5DB" />
//                 <Text style={InventoryStyles.emptyText}>No ingredients found</Text>
//                 <Text style={InventoryStyles.emptySubtext}>Try adjusting your search.</Text>
//               </View>
//             }
//           />
//         </Animated.View>
//       )}
//     </SafeAreaView>
//   )
// }

// export default InventoryPage

// components/InventoryPage/Inventory.tsx
"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Animated,
  Modal,
  ScrollView,
  Switch,
  Alert,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import headerStyles from "@/styles/InventoryHeader"
import useIngredients from "@/hooks/useIngredients"
import { deleteIngredient, updateIngredient } from "@/api/ingredientService"
import { useUserStore } from "@/stores/useUserStore"
import InventoryStyles from "@/styles/InventoryPage"

const { width } = Dimensions.get("window")

interface Ingredient {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiresIn: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

// Available units for ingredients
const UNITS = ["pcs", "kg", "g", "L", "ml", "oz", "lb", "tbsp", "tsp", "cup"];

// Sample ingredient data with expiration dates and quantities
const CATEGORIES = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Meats",
  "Grains",
  "Condiments",
  "Other"
]

const InventoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { ingredients, setIngredients, loading, fadeAnim, translateY } = useIngredients()
  const userId = useUserStore((state) => state.user?.user_id)
  
  // Modal state
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null)
  const [editedIngredient, setEditedIngredient] = useState<Ingredient | null>(null)
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false)
  
  // This function will return the same category for the same ingredient name
  const getConsistentCategory = (name: string): string => {
    // A list of common ingredients in each category
    const categoryMaps: Record<string, string[]> = {
      "Fruits": ["apple", "banana", "orange", "strawberry", "grape", "berry", "lemon", "avocado", "kiwi", "melon", "pear", "peach", "plum", "pineapple", "mango"],
      "Vegetables": ["carrot", "lettuce", "broccoli", "spinach", "onion", "tomato", "potato", "pepper", "corn", "bean", "garlic", "cucumber", "eggplant", "celery", "cabbage"],
      "Dairy": ["milk", "cheese", "yogurt", "butter", "cream", "sour", "cottage", "cheddar", "mozzarella", "parmesan", "whey", "brie"],
      "Meats": ["beef", "chicken", "pork", "lamb", "turkey", "steak", "sausage", "bacon", "ham", "ribs", "fish", "salmon", "tuna", "meat", "veal", "duck"],
      "Grains": ["rice", "bread", "pasta", "flour", "oat", "wheat", "barley", "cereal", "grain", "rye", "corn", "quinoa", "millet"],
      "Condiments": ["salt", "pepper", "oil", "vinegar", "sauce", "ketchup", "mustard", "mayonnaise", "syrup", "honey", "jam", "dressing", "spice", "herb"],
    };
    
    // Convert name to lowercase for matching
    const lowercaseName = name.toLowerCase();
    
    // Check if the ingredient name contains any keywords from each category
    for (const [category, keywords] of Object.entries(categoryMaps)) {
      if (keywords.some(keyword => lowercaseName.includes(keyword))) {
        return category;
      }
    }
    
    // Use a hash of the name to get a consistent category for unknown ingredients
    const nameHash = lowercaseName.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    // If no match found, use the name hash to pick a category consistently
    const categoriesWithoutAll = CATEGORIES.slice(1); // exclude "All"
    return categoriesWithoutAll[nameHash % categoriesWithoutAll.length];
  }

  // Create a state to store the processed ingredients
  const [enhancedIngredients, setEnhancedIngredients] = useState<Ingredient[]>([]);

  // Generate nutritional information based on ingredient name
  const generateNutritionalInfo = (name: string, seed: number): { calories: number, protein: number, carbs: number, fat: number } => {
    // Create deterministic but "random-looking" values based on the ingredient name
    const getSeededValue = (min: number, max: number, offset = 0) => {
      return min + ((seed + offset) % (max - min + 1));
    };
    
    return {
      calories: getSeededValue(30, 400, 0),
      protein: getSeededValue(0, 30, 1),
      carbs: getSeededValue(0, 50, 2),
      fat: getSeededValue(0, 20, 3),
    };
  };

  // Generate ingredient data ONLY when ingredients array changes
  useEffect(() => {
    if (ingredients.length > 0) {
      // Use a consistent mapping function to ensure categories don't change
      const processedIngredients = ingredients.map((name: string) => {
        // Generate a consistent seed for each ingredient name
        const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Use the seed to deterministically assign values
        const getSeededRandomInt = (min: number, max: number, offset = 0) => {
          const modulo = max - min + 1;
          return min + ((seed + offset) % modulo);
        };
        
        // Generate consistent values for each ingredient
        const quantity = getSeededRandomInt(1, 5);
        const unitIndex = getSeededRandomInt(0, UNITS.length - 1, 1);
        const expiresIn = getSeededRandomInt(1, 14, 2);
        const nutritionalInfo = generateNutritionalInfo(name, seed);
        
        return {
          name,
          category: getConsistentCategory(name),
          quantity,
          unit: UNITS[unitIndex],
          expiresIn,
          ...nutritionalInfo
        };
      });
      
      setEnhancedIngredients(processedIngredients);
    } else {
      setEnhancedIngredients([]);
    }
  }, [ingredients]);

  // Filter ingredients based on search query and category
  const filteredIngredients = enhancedIngredients.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort ingredients by expiration date
  const sortedIngredients = [...filteredIngredients].sort((a, b) => a.expiresIn - b.expiresIn)

  // Get expiration status color
  const getExpirationColor = (days: number) => {
    if (days <= 2) return "#EF4444" // Red for urgent
    if (days <= 5) return "#F59E0B" // Yellow for warning
    return "#10B981" // Green for good
  }

  // Delete handler
  const handleDeleteIngredient = async (ingredientName: string) => {
    if (!userId) return
    try {
      await deleteIngredient(userId, ingredientName)
      setEnhancedIngredients((prev) => 
        prev.filter((item) => item.name !== ingredientName)
      )
      setIngredients((prev: string[]) =>
        prev.filter((item) => item !== ingredientName)
      )
    } catch (error) {
      console.error("Error deleting ingredient:", error)
    }
  }

  // Open edit modal
  const handleEditIngredient = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient)
    setEditedIngredient({...ingredient})
    setShowNutritionalInfo(false)
    setEditModalVisible(true)
  }

  // Save edited ingredient
  const handleSaveIngredient = async () => {
    if (!editedIngredient || !userId || !currentIngredient) return
    
    try {
      // Update ingredient in the backend
      // If updateIngredient isn't implemented, we'll just update the local state
      if (typeof updateIngredient === 'function') {
        await updateIngredient(userId, currentIngredient.name, editedIngredient)
      }
      
      // Update the local state with the edited ingredient
      // If the name was changed, we need to update the base ingredients array as well
      if (currentIngredient.name !== editedIngredient.name) {
        setIngredients((prev: string[]) => 
          prev.map(name => name === currentIngredient.name ? editedIngredient.name : name)
        )
      }
      
      // Update the enhanced ingredients list
      setEnhancedIngredients(prev => 
        prev.map(item => 
          item.name === currentIngredient.name ? editedIngredient : item
        )
      )
      
      setEditModalVisible(false)
      Alert.alert("Success", "Ingredient updated successfully!")
    } catch (error) {
      console.error("Error updating ingredient:", error)
      Alert.alert("Error", "Failed to update ingredient. Please try again.")
    }
  }

  const renderItem = ({ item }: { item: Ingredient }) => (
    <TouchableOpacity 
      style={InventoryStyles.ingredientCard}
      onPress={() => handleEditIngredient(item)}
    >
      <View style={InventoryStyles.ingredientLeft}>
        <View style={[InventoryStyles.categoryIndicator, { backgroundColor: getCategoryColor(item.category) }]} />
        <View>
          <Text style={InventoryStyles.ingredientName}>{item.name}</Text>
          <Text style={InventoryStyles.ingredientMeta}>
            {item.quantity} {item.unit} • {item.category}
          </Text>
        </View>
      </View>
  
      <View style={InventoryStyles.ingredientRight}>
        <View style={InventoryStyles.expirationContainer}>
          <Text style={[
            InventoryStyles.expirationText, 
            { color: getExpirationColor(item.expiresIn) }
          ]}>
            {item.expiresIn} days
          </Text>
        </View>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();  // Prevent triggering the parent TouchableOpacity
            handleDeleteIngredient(item.name);
          }}
          style={InventoryStyles.deleteButton}
        >
          <Feather name="trash-2" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
  
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Fruits": "#F59E0B",
      "Vegetables": "#10B981",
      "Dairy": "#60A5FA",
      "Meats": "#EF4444",
      "Grains": "#8B5CF6",
      "Condiments": "#EC4899",
      "Other": "#6B7280"
    }
    return colors[category as keyof typeof colors] || "#6B7280"
  }

  // Edit Modal component
  const renderEditModal = () => (
    <Modal
      visible={editModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={InventoryStyles.modalOverlay}>
        <View style={InventoryStyles.modalContent}>
          <View style={InventoryStyles.modalHeader}>
            <Text style={InventoryStyles.modalTitle}>Edit Ingredient</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={InventoryStyles.modalBody}>
            {editedIngredient && (
              <>
                <View style={InventoryStyles.formGroup}>
                  <Text style={InventoryStyles.label}>Name</Text>
                  <TextInput
                    style={InventoryStyles.textInput}
                    value={editedIngredient.name}
                    onChangeText={(text) => setEditedIngredient({...editedIngredient, name: text})}
                  />
                </View>

                <View style={InventoryStyles.formGroup}>
                  <Text style={InventoryStyles.label}>Category</Text>
                  <View style={InventoryStyles.pickerContainer}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={CATEGORIES.filter(cat => cat !== "All")}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            InventoryStyles.categoryPill,
                            editedIngredient.category === item && InventoryStyles.categoryPillActive
                          ]}
                          onPress={() => setEditedIngredient({...editedIngredient, category: item})}
                        >
                          <View style={[InventoryStyles.categoryDot, { backgroundColor: getCategoryColor(item) }]} />
                          <Text
                            style={[
                              InventoryStyles.categoryPillText,
                              editedIngredient.category === item && InventoryStyles.categoryPillTextActive
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item}
                      contentContainerStyle={InventoryStyles.categoryPillsList}
                    />
                  </View>
                </View>

                <View style={InventoryStyles.formGroup}>
                  <Text style={InventoryStyles.label}>Quantity</Text>
                  <View style={InventoryStyles.quantityContainer}>
                    <TouchableOpacity
                      style={InventoryStyles.quantityButton}
                      onPress={() => {
                        if (editedIngredient.quantity > 0.1) {
                          setEditedIngredient({
                            ...editedIngredient,
                            quantity: Number((editedIngredient.quantity - 0.1).toFixed(1))
                          })
                        }
                      }}
                    >
                      <Feather name="minus" size={18} color="#333" />
                    </TouchableOpacity>
                    
                    <TextInput
                      style={InventoryStyles.quantityInput}
                      value={editedIngredient.quantity.toString()}
                      onChangeText={(text) => {
                        const value = parseFloat(text)
                        if (!isNaN(value) && value >= 0) {
                          setEditedIngredient({...editedIngredient, quantity: value})
                        }
                      }}
                      keyboardType="numeric"
                    />
                    
                    <TouchableOpacity
                      style={InventoryStyles.quantityButton}
                      onPress={() => {
                        setEditedIngredient({
                          ...editedIngredient,
                          quantity: Number((editedIngredient.quantity + 0.1).toFixed(1))
                        })
                      }}
                    >
                      <Feather name="plus" size={18} color="#333" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={InventoryStyles.formGroup}>
                  <Text style={InventoryStyles.label}>Unit</Text>
                  <View style={InventoryStyles.pickerContainer}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={UNITS}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            InventoryStyles.unitPill,
                            editedIngredient.unit === item && InventoryStyles.unitPillActive
                          ]}
                          onPress={() => setEditedIngredient({...editedIngredient, unit: item})}
                        >
                          <Text
                            style={[
                              InventoryStyles.unitPillText,
                              editedIngredient.unit === item && InventoryStyles.unitPillTextActive
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item}
                      contentContainerStyle={InventoryStyles.unitPillsList}
                    />
                  </View>
                </View>

                <View style={InventoryStyles.formGroup}>
                  <Text style={InventoryStyles.label}>Expires In (days)</Text>
                  <View style={InventoryStyles.quantityContainer}>
                    <TouchableOpacity
                      style={InventoryStyles.quantityButton}
                      onPress={() => {
                        if (editedIngredient.expiresIn > 1) {
                          setEditedIngredient({
                            ...editedIngredient,
                            expiresIn: editedIngredient.expiresIn - 1
                          })
                        }
                      }}
                    >
                      <Feather name="minus" size={18} color="#333" />
                    </TouchableOpacity>
                    
                    <TextInput
                      style={InventoryStyles.quantityInput}
                      value={editedIngredient.expiresIn.toString()}
                      onChangeText={(text) => {
                        const value = parseInt(text)
                        if (!isNaN(value) && value >= 0) {
                          setEditedIngredient({...editedIngredient, expiresIn: value})
                        }
                      }}
                      keyboardType="numeric"
                    />
                    
                    <TouchableOpacity
                      style={InventoryStyles.quantityButton}
                      onPress={() => {
                        setEditedIngredient({
                          ...editedIngredient,
                          expiresIn: editedIngredient.expiresIn + 1
                        })
                      }}
                    >
                      <Feather name="plus" size={18} color="#333" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={InventoryStyles.formGroup}>
                  <View style={InventoryStyles.switchContainer}>
                    <Text style={InventoryStyles.label}>Nutritional Information</Text>
                    <Switch
                      value={showNutritionalInfo}
                      onValueChange={setShowNutritionalInfo}
                      trackColor={{ false: "#D1D5DB", true: "#9AAA8C" }}
                      thumbColor={showNutritionalInfo ? "#FFF8D9" : "#f4f3f4"}
                    />
                  </View>
                </View>

                {showNutritionalInfo && (
                  <>
                    <View style={InventoryStyles.formGroup}>
                      <Text style={InventoryStyles.label}>Calories</Text>
                      <View style={InventoryStyles.quantityContainer}>
                        <TouchableOpacity
                          style={InventoryStyles.quantityButton}
                          onPress={() => {
                            if ((editedIngredient.calories || 0) > 5) {
                              setEditedIngredient({
                                ...editedIngredient,
                                calories: (editedIngredient.calories || 0) - 5
                              })
                            }
                          }}
                        >
                          <Feather name="minus" size={18} color="#333" />
                        </TouchableOpacity>
                        
                        <TextInput
                          style={InventoryStyles.quantityInput}
                          value={(editedIngredient.calories || 0).toString()}
                          onChangeText={(text) => {
                            const value = parseInt(text)
                            if (!isNaN(value) && value >= 0) {
                              setEditedIngredient({...editedIngredient, calories: value})
                            }
                          }}
                          keyboardType="numeric"
                        />
                        
                        <TouchableOpacity
                          style={InventoryStyles.quantityButton}
                          onPress={() => {
                            setEditedIngredient({
                              ...editedIngredient,
                              calories: (editedIngredient.calories || 0) + 5
                            })
                          }}
                        >
                          <Feather name="plus" size={18} color="#333" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={InventoryStyles.macroRow}>
                      <View style={InventoryStyles.macroColumn}>
                        <Text style={InventoryStyles.label}>Protein (g)</Text>
                        <TextInput
                          style={InventoryStyles.macroInput}
                          value={(editedIngredient.protein || 0).toString()}
                          onChangeText={(text) => {
                            const value = parseFloat(text)
                            if (!isNaN(value) && value >= 0) {
                              setEditedIngredient({...editedIngredient, protein: value})
                            }
                          }}
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={InventoryStyles.macroColumn}>
                        <Text style={InventoryStyles.label}>Carbs (g)</Text>
                        <TextInput
                          style={InventoryStyles.macroInput}
                          value={(editedIngredient.carbs || 0).toString()}
                          onChangeText={(text) => {
                            const value = parseFloat(text)
                            if (!isNaN(value) && value >= 0) {
                              setEditedIngredient({...editedIngredient, carbs: value})
                            }
                          }}
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={InventoryStyles.macroColumn}>
                        <Text style={InventoryStyles.label}>Fat (g)</Text>
                        <TextInput
                          style={InventoryStyles.macroInput}
                          value={(editedIngredient.fat || 0).toString()}
                          onChangeText={(text) => {
                            const value = parseFloat(text)
                            if (!isNaN(value) && value >= 0) {
                              setEditedIngredient({...editedIngredient, fat: value})
                            }
                          }}
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </>
                )}
              </>
            )}
          </ScrollView>

          <View style={InventoryStyles.modalFooter}>
            <TouchableOpacity
              style={InventoryStyles.cancelButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={InventoryStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={InventoryStyles.saveButton}
              onPress={handleSaveIngredient}
            >
              <Text style={InventoryStyles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Use a ScrollView for the entire content to ensure vertical scrolling
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8D9" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <LinearGradient
          colors={["#B9C5A9", "#9AAA8C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={headerStyles.headerGradient}
        >
          <View style={headerStyles.decorativeCircle} />
          <View style={headerStyles.decorativeCircleSmall} />

          <View style={headerStyles.headerContent}>
            <View style={headerStyles.logoContainer}>
              <MaterialCommunityIcons name="fridge-outline" size={24} color="#FFF8D9" />
              <Text style={headerStyles.logoText}>
                Fridge <Text style={headerStyles.logoTextHighlight}>Inventory</Text>
              </Text>
            </View>
          </View>

          <View style={headerStyles.welcomeContainer}>
            <Text style={headerStyles.welcomeText}>My Ingredients</Text>
            <Text style={headerStyles.welcomeSubtext}>Manage your food items</Text>
          </View>

          {/* Dashboard Cards */}
          <View style={headerStyles.cardsContainer}>
            <LinearGradient
              colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
              style={headerStyles.card}
            >
              <View style={headerStyles.cardIconContainer}>
                <MaterialCommunityIcons name="food-apple" size={22} color="#FFF8D9" />
              </View>
              <Text style={headerStyles.cardValue}>{ingredients.length}</Text>
              <Text style={headerStyles.cardTitle}>Total Items</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
              style={headerStyles.card}
            >
              <View style={headerStyles.cardIconContainer}>
                <MaterialCommunityIcons name="clock-alert-outline" size={22} color="#FFF8D9" />
              </View>
              <Text style={headerStyles.cardValue}>
                {sortedIngredients.filter(i => i.expiresIn <= 3).length}
              </Text>
              <Text style={headerStyles.cardTitle}>Expiring Soon</Text>
            </LinearGradient>
          </View>
        </LinearGradient>

        {/* Content Container */}
        <View style={InventoryStyles.contentContainer}>
          {/* Search Bar */}
          <View style={InventoryStyles.searchContainer}>
            <View style={InventoryStyles.searchBar}>
              <Feather
                name="search"
                size={20}
                color="#9CA3AF"
                style={InventoryStyles.searchIcon}
              />
              <TextInput
                style={InventoryStyles.searchInput}
                placeholder="Search ingredients..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Feather name="x" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Category Filter */}
          <View style={InventoryStyles.categoryContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    InventoryStyles.categoryButton,
                    selectedCategory === item && InventoryStyles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text
                    style={[
                      InventoryStyles.categoryText,
                      selectedCategory === item && InventoryStyles.categoryTextActive
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>

          {/* Ingredients List */}
          {loading ? (
            <View style={InventoryStyles.loadingContainer}>
              <Text style={InventoryStyles.loadingText}>Loading ingredients...</Text>
            </View>
          ) : (
            <Animated.View
              style={{ 
                opacity: fadeAnim, 
                transform: [{ translateY }],
                flexGrow: 1
              }}
            >
              <FlatList
                data={sortedIngredients}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                contentContainerStyle={InventoryStyles.ingredientsList}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                scrollEnabled={true}
                ListEmptyComponent={
                  <View style={InventoryStyles.emptyContainer}>
                    <MaterialCommunityIcons
                      name="food-off"
                      size={60}
                      color="#373737"
                      style={{ opacity: 0.5 }}
                    />
                    <Text style={InventoryStyles.emptyText}>No ingredients found</Text>
                    <Text style={InventoryStyles.emptySubtext}>
                      {searchQuery.length > 0 ? "Try adjusting your search or category filter." : "Add ingredients by scanning your fridge!"}
                    </Text>
                  </View>
                }
              />
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* Add ingredient button */}
      <TouchableOpacity style={InventoryStyles.addButton}>
        <Feather name="plus" size={24} color="#FFF8D9" />
      </TouchableOpacity>

      {/* Edit Modal */}
      {renderEditModal()}
    </SafeAreaView>
  )
}

export default InventoryPage