"use client"

import React, { useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import headerStyles from "@/styles/InventoryHeader"
import useIngredients from "@/hooks/useIngredients" // Adjust path as needed
import { deleteIngredient } from "@/api/ingredientService" // New delete API function
import { useUserStore } from "@/stores/useUserStore"
import InventoryStyles from "@/styles/InventoryPage" // Fixed import

const InventoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  // Use our custom hook, which now returns setIngredients
  const { ingredients, setIngredients, loading, fadeAnim, translateY } = useIngredients()
  const userId = useUserStore((state) => state.user?.user_id)

  const filteredIngredients = ingredients.filter((name: string) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Delete handler
  const handleDeleteIngredient = async (ingredientName: string) => {
    console.log("Delete pressed for:", ingredientName)
    if (!userId) return
    try {
      await deleteIngredient(userId, ingredientName)
      setIngredients((prev: string[]) =>
        prev.filter((item) => item !== ingredientName)
      )
    } catch (error) {
      console.error("Error deleting ingredient:", error)
    }
  }

  const renderItem = ({ item }: { item: string }) => (
    <View style={InventoryStyles.ingredientCard}>
      <Text style={InventoryStyles.ingredientName}>{item}</Text>
      <TouchableOpacity
        onPress={() => handleDeleteIngredient(item)}
        style={InventoryStyles.deleteButton}
      >
        <Feather name="trash-2" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={InventoryStyles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header Section */}
      <LinearGradient
        colors={["#10B981", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={headerStyles.headerGradient}
      >
        {/* Decorative elements */}
        <View style={headerStyles.decorativeCircle} />
        <View style={headerStyles.decorativeCircleSmall} />

        <View style={headerStyles.headerContent}>
          <View style={headerStyles.logoContainer} />
        </View>

        <View style={headerStyles.welcomeContainer}>
          <Text style={headerStyles.welcomeText}>Inventory</Text>
          <Text style={headerStyles.welcomeSubtext}>Manage your ingredients</Text>
        </View>

        {/* Dashboard Card */}
        <View style={headerStyles.cardsContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
            style={headerStyles.card}
          >
            <View style={headerStyles.cardIconContainer}>
              <MaterialCommunityIcons name="food-variant" size={22} color="#FFFFFF" />
            </View>
            <Text style={headerStyles.cardValue}>{ingredients.length}</Text>
            <Text style={headerStyles.cardTitle}>Total Items</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

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

      {/* Ingredients List */}
      {loading ? (
        <View style={InventoryStyles.loadingContainer}>
          <Text style={InventoryStyles.loadingText}>Loading ingredients...</Text>
        </View>
      ) : (
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY }], flex: 1 }}
        >
          <FlatList
            data={filteredIngredients}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={InventoryStyles.ingredientsList}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              <View style={InventoryStyles.emptyContainer}>
                <MaterialCommunityIcons
                  name="food-off"
                  size={60}
                  color="#D1D5DB"
                />
                <Text style={InventoryStyles.emptyText}>No ingredients found</Text>
                <Text style={InventoryStyles.emptySubtext}>
                  Try adjusting your search.
                </Text>
              </View>
            }
          />
        </Animated.View>
      )}
    </SafeAreaView>
  )
}

export default InventoryPage
