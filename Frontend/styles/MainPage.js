import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// Adjust cardSize to take around 40% of screen width
const cardSize = width * 0.4;

export default StyleSheet.create({
  // Removed overflow: 'hidden' to allow scrolling
  container: {
    flex: 1,
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
  // Updated cards container styling for responsiveness
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 25,
  },
  // Updated card styling for a responsive square card
  card: {
    width: cardSize,
    height: cardSize,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E', // Update to your preferred background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20, // Space for wrapping on smaller screens
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
