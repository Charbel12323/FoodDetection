import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
type ResponseRouteParams = {
    gptResponse: string;
  };
  
  export default function ResponseScreen({ route }: { route: ResponseRouteParams }) {
  const { gptResponse } = route;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>GPT Response:</Text>
      <Text style={styles.responseText}>{JSON.stringify(gptResponse, null, 2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
