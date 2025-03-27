import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import headerStyles from "@/styles/InventoryHeader";
import useIngredients from "@/hooks/useIngredients";
import { useUserStore } from "@/stores/useUserStore";
import InventoryStyles from "@/styles/InventoryPage";
import { deleteIngredient } from "@/api/ingredientService";

const { width } = Dimensions.get("window");

// Array of colors for random selection
const RANDOM_COLORS = [
  "#F59E0B",
  "#10B981",
  "#60A5FA",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6B7280",
];

// Generate a consistent random color based on the ingredient name
const getRandomColor = (ingredient: string): string => {
  let hash = 0;
  for (let i = 0; i < ingredient.length; i++) {
    hash = ingredient.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % RANDOM_COLORS.length;
  return RANDOM_COLORS[index];
};

const InventoryPage: React.FC = () => {
  const { ingredients, setIngredients, loading, fadeAnim, translateY, addIngredient } = useIngredients();
  const userId = useUserStore((state) => state.user?.user_id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");

  // Process ingredients without category information
  const processedIngredients = ingredients.map((name: string) => ({ name }));

  const handleDeleteIngredient = async (ingredientName: string) => {
    if (!userId) {
      console.warn("No user ID available.");
      return;
    }
    try {
      await deleteIngredient(userId, ingredientName);
      setIngredients((prev) => prev.filter((ing) => ing !== ingredientName));
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const addNewIngredient = async () => {
    if (newIngredient.trim() === "") return;
    const ingredientToAdd = newIngredient.trim();
    await addIngredient(ingredientToAdd);
    setNewIngredient("");
    setShowAddModal(false);
  };

  const renderItem = ({ item }: { item: { name: string } }) => (
    <View style={InventoryStyles.ingredientCard}>
      <View style={InventoryStyles.ingredientLeft}>
        {/* Randomized colored line */}
        <View
          style={{
            width: 4,
            backgroundColor: getRandomColor(item.name),
            marginRight: 10,
          }}
        />
        <View>
          <Text style={InventoryStyles.ingredientName}>{item.name}</Text>
        </View>
      </View>
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
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8D9" }}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <View style={InventoryStyles.loadingContainer}>
          <Text style={InventoryStyles.loadingText}>Loading ingredients...</Text>
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
            data={processedIngredients}
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
                <Text style={InventoryStyles.emptyText}>No ingredients found</Text>
                <Text style={InventoryStyles.emptySubtext}>
                  Add ingredients by scanning your fridge!
                </Text>
              </View>
            }
          />
          {/* Add Button */}
          <TouchableOpacity
            style={InventoryStyles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Feather name="plus" size={28} color="#FFF8D9" />
          </TouchableOpacity>
        </Animated.View>
      )}
      {/* Modal for adding new ingredient */}
      <Modal
        transparent
        animationType="slide"
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={InventoryStyles.modalOverlay}>
          <View style={InventoryStyles.modalContent}>
            <Text style={InventoryStyles.modalTitle}>Add New Ingredient</Text>
            <TextInput
              style={InventoryStyles.textInput}
              placeholder="Enter ingredient name"
              value={newIngredient}
              onChangeText={setNewIngredient}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16 }}>
              <TouchableOpacity
                style={InventoryStyles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={InventoryStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[InventoryStyles.saveButton, { marginLeft: 8 }]}
                onPress={addNewIngredient}
              >
                <Text style={InventoryStyles.saveButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InventoryPage;
