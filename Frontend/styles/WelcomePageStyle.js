import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE5', // Light cream color from the image
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#4AADCB', // Blue color from the image
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#ACACAC', // Gray color for the subtitle
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  signInButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#F2D589', // Yellow color from the image
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  registerButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#F7AD56', // Orange color from the image
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});