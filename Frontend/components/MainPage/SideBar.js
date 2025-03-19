// import React, { useState, useRef, useEffect } from 'react';
// import { useUserStore } from '@/stores/useUserStore';
// import styles from '@/styles/SideBarStyle';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   TouchableWithoutFeedback, 
//   Animated, 
//   Dimensions, 
//   Platform
// } from 'react-native';

// // Feather icons
// import { 
//   Home, 
//   ShoppingCart, 
//   Heart, 
//   Settings, 
//   LogOut, 
//   Menu, 
//   X
// } from 'react-native-feather';

// // Import your styles from a separate file
// // import styles from '@/styles/SideBarStyle';  // Adjust the path as needed

// const { width } = Dimensions.get('window');
// const SIDEBAR_WIDTH = 280;

// export default function SideBar() {
//   const user = useUserStore((state) => state.user);
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeItem, setActiveItem] = useState('Home');

//   // Animations
//   const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const itemsAnim = useRef([...Array(6)].map(() => new Animated.Value(50))).current;

//   const menuItems = [
//     { id: 'Home', icon: Home, label: 'Home' },
//     { id: 'Inventory', icon: ShoppingCart, label: 'Inventory' },
//     { id: 'Favorites', icon: Heart, label: 'Favorites' },
//   ];

//   const footerItems = [
//     { id: 'Settings', icon: Settings, label: 'Settings' },
//     { id: 'Logout', icon: LogOut, label: 'Logout' },
//   ];

//   // Toggle sidebar
//   const toggleSidebar = () => {
//     Animated.timing(fadeAnim, {
//       toValue: isVisible ? 0 : 0.5,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(slideAnim, {
//       toValue: isVisible ? SIDEBAR_WIDTH : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     setIsVisible(!isVisible);

//     if (!isVisible) {
//       // Animate menu items in
//       itemsAnim.forEach((anim, index) => {
//         Animated.timing(anim, {
//           toValue: 0,
//           duration: 300,
//           delay: 100 + index * 50,
//           useNativeDriver: true,
//         }).start();
//       });
//     } else {
//       // Reset animations when closing
//       itemsAnim.forEach(anim => {
//         anim.setValue(50);
//       });
//     }
//   };

//   // Close sidebar
//   const closeSidebar = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(slideAnim, {
//       toValue: SIDEBAR_WIDTH,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsVisible(false);
//       // Reset animations
//       itemsAnim.forEach(anim => {
//         anim.setValue(50);
//       });
//     });
//   };

//   // Handle item press
//   const handleItemPress = (id) => {
//     setActiveItem(id);
//     // Auto-close on mobile
//     if (Platform.OS !== 'web') {
//       setTimeout(closeSidebar, 300);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Menu Button */}
//       <TouchableOpacity 
//         onPress={toggleSidebar} 
//         style={[styles.menuButton, isVisible && styles.menuButtonActive]}
//         activeOpacity={0.8}
//       >
//         {isVisible ? (
//           <X width={20} height={20} color="#fff" />
//         ) : (
//           <Menu width={20} height={20} color="#fff" />
//         )}
//       </TouchableOpacity>

//       {/* Overlay */}
//       <Animated.View 
//         style={[
//           styles.overlay, 
//           { 
//             opacity: fadeAnim,
//             display: isVisible ? 'flex' : 'none' 
//           }
//         ]}
//       >
//         <TouchableWithoutFeedback onPress={closeSidebar}>
//           <View style={styles.overlayTouchable} />
//         </TouchableWithoutFeedback>
//       </Animated.View>

//       {/* Sidebar */}
//       <Animated.View 
//         style={[
//           styles.sidebar, 
//           { transform: [{ translateX: slideAnim }] }
//         ]}
//       >
//         {/* Profile Section */}
//         <View style={styles.profileSection}>
//         <Text style={styles.profileName}>{user?.username || "Emma Johnson"}</Text>
//         <Text style={styles.profileEmail}>{user?.email || "emma@example.com"}</Text>
//         </View>

//         {/* Menu Items */}
//         <View style={styles.menuItems}>
//           {menuItems.map((item, index) => (
//             <Animated.View 
//               key={item.id}
//               style={{ 
//                 transform: [{ translateX: itemsAnim[index] }],
//                 opacity: itemsAnim[index].interpolate({
//                   inputRange: [0, 50],
//                   outputRange: [1, 0]
//                 })
//               }}
//             >
//               <TouchableOpacity 
//                 style={[
//                   styles.menuItem, 
//                   activeItem === item.id && styles.activeMenuItem
//                 ]}
//                 onPress={() => handleItemPress(item.id)}
//                 activeOpacity={0.7}
//               >
//                 <View style={[
//                   styles.menuIconContainer,
//                   activeItem === item.id && styles.activeMenuIconContainer
//                 ]}>
//                   <item.icon 
//                     width={20} 
//                     height={20} 
//                     color={activeItem === item.id ? '#0BAB64' : '#fff'} 
//                   />
//                 </View>
//                 <Text style={[
//                   styles.menuItemText,
//                   activeItem === item.id && styles.activeMenuItemText
//                 ]}>
//                   {item.label}
//                 </Text>
//                 {activeItem === item.id && (
//                   <View style={styles.activeIndicator} />
//                 )}
//               </TouchableOpacity>
//             </Animated.View>
//           ))}
//         </View>

//         {/* Divider */}
//         <View style={styles.divider} />

//         {/* Footer Items */}
//         <View style={styles.footerItems}>
//           {footerItems.map((item, index) => (
//             <Animated.View 
//               key={item.id}
//               style={{ 
//                 transform: [{ translateX: itemsAnim[index + menuItems.length] }],
//                 opacity: itemsAnim[index + menuItems.length].interpolate({
//                   inputRange: [0, 50],
//                   outputRange: [1, 0]
//                 })
//               }}
//             >
//               <TouchableOpacity 
//                 style={[
//                   styles.menuItem, 
//                   activeItem === item.id && styles.activeMenuItem
//                 ]}
//                 onPress={() => handleItemPress(item.id)}
//                 activeOpacity={0.7}
//               >
//                 <View style={[
//                   styles.menuIconContainer,
//                   activeItem === item.id && styles.activeMenuIconContainer
//                 ]}>
//                   <item.icon 
//                     width={20} 
//                     height={20} 
//                     color={activeItem === item.id ? '#0BAB64' : '#fff'} 
//                   />
//                 </View>
//                 <Text style={[
//                   styles.menuItemText,
//                   activeItem === item.id && styles.activeMenuItemText
//                 ]}>
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             </Animated.View>
//           ))}
//         </View>

//         {/* Version */}
//         <Text style={styles.versionText}>Version 1.0.0</Text>
//       </Animated.View>
//     </View>
//   );
// }



import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Animated, 
  Dimensions, 
  Platform
} from 'react-native';
import { useUserStore } from '@/stores/useUserStore'; // 2) For user + clearUser
import styles from '@/styles/SideBarStyle';
import { useRouter } from 'expo-router';
// Feather icons
import { 
  Home, 
  ShoppingCart, 
  Heart, 
  Settings, 
  LogOut, 
  Menu, 
  X
} from 'react-native-feather';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = 280;

export default function SideBar() {

  // Get user info + logout function from store
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const router = useRouter();                  // For navigation
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('Home'); // Local active item state

  // Animations
  const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // 6 total items => 3 in menuItems + 2 in footerItems = 5, plus 1 extra?
  const itemsAnim = useRef([...Array(6)].map(() => new Animated.Value(50))).current;

  const menuItems = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'Inventory', icon: ShoppingCart, label: 'Inventory' },
    { id: 'Favorites', icon: Heart, label: 'Favorites' },
  ];

  const footerItems = [
    { id: 'Settings', icon: Settings, label: 'Settings' },
    { id: 'Logout', icon: LogOut, label: 'Logout' },
  ];

  // Toggle sidebar open/close
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
      // Animate menu items in
      itemsAnim.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          delay: 100 + index * 50,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Reset animations when closing
      itemsAnim.forEach(anim => {
        anim.setValue(50);
      });
    }
  };

  // Close sidebar
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
      // Reset animations
      itemsAnim.forEach(anim => {
        anim.setValue(50);
      });
    });
  };

  // Handle menu item presses
  const handleItemPress = (id) => {
    // Logout logic
    if (id === 'Logout') {
      clearUser();                  // Clears the user from store + AsyncStorage
      router.push('/(preLogin)/login'); // Navigate to login screen
      return;
    }

    // Otherwise, update local active item
    setActiveItem(id);

    // Auto-close on mobile
    if (Platform.OS !== 'web') {
      setTimeout(closeSidebar, 300);
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu Button (toggle open/close) */}
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

      {/* Overlay (dark background when sidebar is open) */}
      <Animated.View 
        style={[
          styles.overlay, 
          { 
            opacity: fadeAnim,
            display: isVisible ? 'flex' : 'none',
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Sidebar Panel */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
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

        {/* Main Menu Items */}
        <View style={styles.menuItems}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{
                transform: [{ translateX: itemsAnim[index] }],
                opacity: itemsAnim[index].interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0],
                }),
              }}
            >
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  activeItem === item.id && styles.activeMenuItem,
                ]}
                onPress={() => handleItemPress(item.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.menuIconContainer,
                    activeItem === item.id && styles.activeMenuIconContainer,
                  ]}
                >
                  <item.icon
                    width={20}
                    height={20}
                    color={activeItem === item.id ? '#0BAB64' : '#fff'}
                  />
                </View>
                <Text
                  style={[
                    styles.menuItemText,
                    activeItem === item.id && styles.activeMenuItemText,
                  ]}
                >
                  {item.label}
                </Text>
                {activeItem === item.id && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer Items (Settings, Logout, etc.) */}
        <View style={styles.footerItems}>
          {footerItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{
                transform: [
                  { translateX: itemsAnim[index + menuItems.length] },
                ],
                opacity: itemsAnim[index + menuItems.length].interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0],
                }),
              }}
            >
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  activeItem === item.id && styles.activeMenuItem,
                ]}
                onPress={() => handleItemPress(item.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.menuIconContainer,
                    activeItem === item.id && styles.activeMenuIconContainer,
                  ]}
                >
                  <item.icon
                    width={20}
                    height={20}
                    color={activeItem === item.id ? '#0BAB64' : '#fff'}
                  />
                </View>
                <Text
                  style={[
                    styles.menuItemText,
                    activeItem === item.id && styles.activeMenuItemText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Animated.View>
    </View>
  );
}
