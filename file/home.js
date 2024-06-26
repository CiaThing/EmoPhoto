import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {

  const navigateToEmotionIdentification = () => {
    navigation.navigate('Identifikasi_Emosi');
  };

  const navigateToAnalysisHistory = () => {
    navigation.navigate('Riwayat_Analisis');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EmoPhoto</Text>
      <Text style={styles.subtitle}>Home Page</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToEmotionIdentification}>
        <Text style={styles.buttonText}>Identifikasi Emosi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToAnalysisHistory}>
        <Text style={styles.buttonText}>Riwayat Analisis</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#CDE8E5',
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    color: '#4e94a5',
    textAlign: 'center', 
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 20,
    color: '#4e94a5',
    textAlign: 'center', 
  },
  button: {
    backgroundColor: '#4d869c',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});
