import React, { useState } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import headerStyles from "@/styles/InventoryHeader";
import useIngredients from "@/hooks/useIngredients";
import { useUserStore } from "@/stores/useUserStore";
import InventoryStyles from "@/styles/InventoryPage";


import {
  deleteIngredient,
} from "@/api/ingredientService";

const { width } = Dimensions.get("window");

interface Ingredient {
  name: string;
  category: string;
}

const CATEGORIES = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Meats",
  "Grains",
  "Condiments",
  "Other",
];

const InventoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { ingredients, setIngredients, loading, fadeAnim, translateY } = useIngredients();
  const userId = useUserStore((state) => state.user?.user_id);

  const getConsistentCategory = (name: string): string => {
    const categoryMaps: Record<string, string[]> = {
      Fruits: ["apple", "banana", "orange", "strawberry", "grape"],
      Vegetables: ["carrot", "lettuce", "broccoli", "spinach", "onion"],
      Dairy: ["milk", "cheese", "yogurt", "butter", "cream"],
      Meats: ["beef", "chicken", "pork", "lamb", "turkey"],
      Grains: ["rice", "bread", "pasta", "flour", "oat"],
      Condiments: ["salt", "pepper", "oil", "vinegar", "sauce"],
    };

    const lowercaseName = name.toLowerCase();
    for (const [category, keywords] of Object.entries(categoryMaps)) {
      if (keywords.some((keyword) => lowercaseName.includes(keyword))) {
        return category;
      }
    }

    // Fallback to hashing for a "consistent" random category
    const nameHash = lowercaseName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const categoriesWithoutAll = CATEGORIES.slice(1);
    return categoriesWithoutAll[nameHash % categoriesWithoutAll.length];
  };

  const processedIngredients: Ingredient[] = ingredients.map((name: string) => ({
    name,
    category: getConsistentCategory(name),
  }));

  const filteredIngredients = processedIngredients.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Fruits: "#F59E0B",
      Vegetables: "#10B981",
      Dairy: "#60A5FA",
      Meats: "#EF4444",
      Grains: "#8B5CF6",
      Condiments: "#EC4899",
      Other: "#6B7280",
    };
    return colors[category as keyof typeof colors] || "#6B7280";
  };

  // 2) Use the service's deleteIngredient
  const handleDeleteIngredient = async (ingredientName: string) => {
    if (!userId) {
      console.warn("No user ID available.");
      return;
    }
    try {
      // Calls your deleteIngredient(...) service method
      await deleteIngredient(userId, ingredientName);

      // Update local state on success
      setIngredients((prev) => prev.filter((ing) => ing !== ingredientName));
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };


  const renderItem = ({ item }: { item: Ingredient }) => (
    <View style={InventoryStyles.ingredientCard}>
      <View style={InventoryStyles.ingredientLeft}>
        <View
          style={[
            InventoryStyles.categoryIndicator,
            { backgroundColor: getCategoryColor(item.category) },
          ]}
        />
        <View>
          <Text style={InventoryStyles.ingredientName}>{item.name}</Text>
          <Text style={InventoryStyles.ingredientMeta}>{item.category}</Text>
        </View>
      </View>
      {/* Delete button on the right */}
      <TouchableOpacity onPress={() => handleDeleteIngredient(item.name)}>
        <Feather name="trash" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <>
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
            <MaterialCommunityIcons
              name="fridge-outline"
              size={24}
              color="#FFF8D9"
            />
            <Text style={headerStyles.logoText}>
              Fridge <Text style={headerStyles.logoTextHighlight}>Inventory</Text>
            </Text>
          </View>
        </View>

        <View style={headerStyles.welcomeContainer}>
          <Text style={headerStyles.welcomeText}>My Ingredients</Text>
          <Text style={headerStyles.welcomeSubtext}>Manage your food items</Text>
        </View>

        <View style={headerStyles.cardsContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
            style={headerStyles.card}
          >
            <View style={headerStyles.cardIconContainer}>
              <MaterialCommunityIcons
                name="food-apple"
                size={22}
                color="#FFF8D9"
              />
            </View>
            <Text style={headerStyles.cardValue}>{ingredients.length}</Text>
            <Text style={headerStyles.cardTitle}>Total Items</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

      <View style={InventoryStyles.contentContainer}>
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

        <View style={InventoryStyles.categoryContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  InventoryStyles.categoryButton,
                  selectedCategory === item &&
                    InventoryStyles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    InventoryStyles.categoryText,
                    selectedCategory === item &&
                      InventoryStyles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8D9" }}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <View style={InventoryStyles.loadingContainer}>
          <Text style={InventoryStyles.loadingText}>
            Loading ingredients...
          </Text>
        </View>
      ) : (
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
          <FlatList
            data={filteredIngredients}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={InventoryStyles.emptyContainer}>
                <MaterialCommunityIcons
                  name="food-off"
                  size={60}
                  color="#373737"
                  style={{ opacity: 0.5 }}
                />
                <Text style={InventoryStyles.emptyText}>
                  No ingredients found
                </Text>
                <Text style={InventoryStyles.emptySubtext}>
                  {searchQuery.length > 0
                    ? "Try adjusting your search or category filter."
                    : "Add ingredients by scanning your fridge!"}
                </Text>
              </View>
            }
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default InventoryPage;
