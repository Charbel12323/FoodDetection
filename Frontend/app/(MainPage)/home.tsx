import React, { useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { ScanLine, Refrigerator, Layers, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Header() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        // Replace userId=1 with the actual logged-in user's ID
        const response = await fetch('http://192.168.1.66:3000/api/ingredients?userId=6');
        const data = await response.json();
        if (data.ingredients) {
          setIngredients(data.ingredients);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        
        // Start animations after data loads
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          })
        ]).start();
      }
    };
    
    fetchIngredients();
  }, []);


  const uniqueIngredients = new Set(ingredients).size;

  
  // Get current date for header
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
 

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIconContainer}>
              <ScanLine size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.logoText}>
              Fridge<Text style={styles.logoTextHighlight}>Scan</Text>
            </Text>
          </View>
          
          
        </View>
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Your Kitchen Inventory</Text>
          <Text style={styles.welcomeSubtext}>
            Track and manage your ingredients
          </Text>
        </View>
      </LinearGradient>
      
      {/* Stats Cards */}
      <Animated.View 
        style={[
          styles.cardsContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: translateY }] 
          }
        ]}
      >
       
        
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={['#0BAB64', '#3BB78F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardIconContainer}>
              <Layers size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.cardValue}>{uniqueIngredients}</Text>
            <Text style={styles.cardTitle}>Unique Items</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        
      </Animated.View>
      
      {/* Decorative Element */}
      <View style={styles.decorativeCircle} />
      <View style={styles.decorativeCircleSmall} />
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 3;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  logoTextHighlight: {
    color: '#6EE7B7',
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  welcomeContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10,
  },
  cardsContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 25,
  },
  card: {
    width: cardWidth,
    height: 120,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    top: -30,
    right: -50,
  },
  decorativeCircleSmall: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: 60,
    left: -20,
  },
});

export default Header;