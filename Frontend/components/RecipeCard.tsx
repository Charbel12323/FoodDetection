import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function RecipeCard({ recipe }: { recipe: any }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(MainPage)/RecipeDetail',
      params: { recipeId: recipe.id }
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.name}</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.heartIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{recipe.time || "30 min"}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{recipe.difficulty || "Easy"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{recipe.ingredients?.length || 0} ingredients</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12
  },
  content: {
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    flex: 1
  },
  favoriteButton: {
    padding: 8
  },
  heartIcon: {
    fontSize: 20
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8
  },
  badge: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  badgeText: {
    fontSize: 12
  },
  footer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f7f7f7'
  },
  footerText: {
    fontSize: 14,
    color: '#64748b'
  }
});