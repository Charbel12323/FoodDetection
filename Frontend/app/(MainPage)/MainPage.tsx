
import React, { useEffect } from 'react';import { SafeAreaView, StatusBar } from 'react-native';
import Header from '@/components/MainPage/Header'; 
import styles from '@/styles/MainPage'; 
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
