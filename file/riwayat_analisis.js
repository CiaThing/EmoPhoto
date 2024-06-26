import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Riwayat_Analisis({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('history').then((hasil) => {
      if (hasil) {
        setHistory(JSON.parse(hasil));
        console.log(hasil);
      }
    });
  }, []);

  const kembali_ke_home_page = () => {
    navigation.navigate('Home');
  };

  const deleteHistoryItem = async (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.index}>{index + 1}</Text>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.result}>{item.result}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteHistoryItem(index)}>
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EmoPhoto</Text>
      <Text style={styles.subtitle}>Riwayat Analisis Page</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.button} onPress={kembali_ke_home_page}>
        <Text style={styles.buttonText}>Kembali ke Home Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  list: {
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  index: {
    fontSize: 20,
    marginRight: 10,
  },
  result: {
    fontSize: 20,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
});
