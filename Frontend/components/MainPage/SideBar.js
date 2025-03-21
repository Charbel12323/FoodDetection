import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Animated, 
  Platform 
} from 'react-native';
import { useUserStore } from '@/stores/useUserStore';
import { 
  Home, 
  ShoppingCart, 
  Heart, 
  LogOut, 
  Menu, 
  X,
  User // New icon for Update Profile
} from 'react-native-feather';
import styles from '@/styles/SideBarStyle';
import { useRouter } from 'expo-router';

const SIDEBAR_WIDTH = 280;

export default function SideBar() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  // Animation values
  const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const itemsAnim = useRef([...Array(6)].map(() => new Animated.Value(50))).current;

  // Updated menu items including the Update Profile option
  const menuItems = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'Inventory', icon: ShoppingCart, label: 'Inventory' },
    { id: 'Recipes', icon: Heart, label: 'Recipes' },
    { id: 'UpdateProfile', icon: User, label: 'Update Profile' } // New entry
  ];

  const footerItems = [
    { id: 'Logout', icon: LogOut, label: 'Logout' },
  ];

  const toggleSidebar = () => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 0 : 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: isVisible ? SIDEBAR_WIDTH : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsVisible(!isVisible);

    if (!isVisible) {
      itemsAnim.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          delay: 100 + index * 50,
          useNativeDriver: true,
        }).start();
      });
    } else {
      itemsAnim.forEach(anim => anim.setValue(50));
    }
  };

  const closeSidebar = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      itemsAnim.forEach(anim => anim.setValue(50));
    });
  };

  const handleItemPress = (id) => {
    setActiveItem(id);

    if (id === 'Inventory') {
      router.push('/(Inventory)/Inventory');
    } else if (id === 'Home') {
      router.push('/(MainPage)/MainPage');
    } else if (id === 'Recipes') {
      router.push('/(Recipes)/Recipes');
    } else if (id === 'UpdateProfile') {
      router.push('/(UpdateProfilePage)/UpdatePage'); // Navigate to the update profile page
    } else if (id === 'Logout') {
      clearUser();
      router.push('/(preLogin)/login');
      return;
    }

    if (Platform.OS !== 'web') {
      setTimeout(closeSidebar, 300);
    }
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Menu Button */}
      <TouchableOpacity
        onPress={toggleSidebar}
        style={[styles.menuButton, isVisible && styles.menuButtonActive]}
        activeOpacity={0.8}
      >
        {isVisible ? (
          <X width={20} height={20} color="#fff" />
        ) : (
          <Menu width={20} height={20} color="#fff" />
        )}
      </TouchableOpacity>

      {/* Overlay */}
      <Animated.View 
        style={[
          styles.overlay, 
          { opacity: fadeAnim, display: isVisible ? 'flex' : 'none' }
        ]}
      >
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Sidebar Panel */}
      <Animated.View 
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Text style={styles.profileName}>
            {user?.username || 'Emma Johnson'}
          </Text>
          <Text style={styles.profileEmail}>
            {user?.email || 'emma@example.com'}
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuItems}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{ 
                transform: [{ translateX: itemsAnim[index] }],
                opacity: itemsAnim[index].interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0]
                })
              }}
            >
              <TouchableOpacity 
                style={[styles.menuItem, activeItem === item.id && styles.activeMenuItem]}
                onPress={() => handleItemPress(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconContainer, activeItem === item.id && styles.activeMenuIconContainer]}>
                  <item.icon 
                    width={20} 
                    height={20} 
                    color={activeItem === item.id ? '#0BAB64' : '#fff'} 
                  />
                </View>
                <Text style={[styles.menuItemText, activeItem === item.id && styles.activeMenuItemText]}>
                  {item.label}
                </Text>
                {activeItem === item.id && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* Footer Items */}
        <View style={styles.footerItems}>
          {footerItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{ 
                transform: [{ translateX: itemsAnim[index + menuItems.length] }],
                opacity: itemsAnim[index + menuItems.length].interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0]
                })
              }}
            >
              <TouchableOpacity 
                style={[styles.menuItem, activeItem === item.id && styles.activeMenuItem]}
                onPress={() => handleItemPress(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconContainer, activeItem === item.id && styles.activeMenuIconContainer]}>
                  <item.icon 
                    width={20} 
                    height={20} 
                    color={activeItem === item.id ? '#0BAB64' : '#fff'} 
                  />
                </View>
                <Text style={[styles.menuItemText, activeItem === item.id && styles.activeMenuItemText]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Animated.View>
    </View>
  );
}
