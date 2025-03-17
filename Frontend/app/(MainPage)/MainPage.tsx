
import React, { useEffect } from 'react';import { SafeAreaView, StatusBar } from 'react-native';
import Header from '@/components/MainPage/Header'; // Adjust the path based on your project structure
import styles from '@/styles/MainPage'; // We reuse container style from MainPage
import  Sidebar from '@/components/MainPage/SideBar';
import { useUserStore } from '@/stores/useUserStore';
export default function App() {

  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2027" />
      <Header />

      <Sidebar />
    </SafeAreaView>
  );
}
