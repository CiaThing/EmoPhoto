import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Identifikasi_Emosi_2({ route, navigation }) {
  const { imageUri } = route.params;
  const [hasil, setHasil] = useState(null);

  const handleGoHome = () => {
    navigation.navigate('Home'); // Sesuaikan dengan nama halaman utama Anda
  };

  const processImage = async () => {
    try {
      const form_data = new FormData();
      form_data.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: imageUri.split("/").pop(),
      });
      // console.log({uri : photo.uri, type: "image/jpg", name : photo.uri.split("/").pop()})
      const result = await axios.post(
        "https://liked-assured-vulture.ngrok-free.app/send_image",
        form_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result.data.hasil);
      setHasil(result.data.hasil)
  
      const historyList = await AsyncStorage.getItem('history')
      if (historyList == null) {
          AsyncStorage.setItem('history', JSON.stringify([{uri: imageUri, result: result.data.hasil}]))
          return; 
      }
      const parsedHistoryList = JSON.parse(historyList)
      parsedHistoryList.push({uri: imageUri, result: result.data.hasil})
      AsyncStorage.setItem('history', JSON.stringify(parsedHistoryList))
      } catch (error) {
      console.log(error);
     }
  };

  useEffect(() => {
    (async () => {
      await processImage()
    })();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>EmoPhoto</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Hasil Analisa Emosi : {hasil}</Text>
      </View>
      <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
        <Text style={styles.homeButtonText}>Ke Home Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: '#4D869C',
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  resultContainer: {
    backgroundColor: '#88BDBC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: '#4D869C',
    padding: 15,
    borderRadius: 10,
  },
  homeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
