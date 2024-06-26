import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { createAssetAsync } from 'expo-media-library';

export default function Identifikasi_Emosi({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);
  const [hasil, setHasil] = useState(null);

  // Check camera permissions on component mount
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

//   const processImage = async () => {
//     try {
//       const form_data = new FormData();
//       form_data.append("file", {
//         uri: imageUri,
//         type: "image/jpeg",
//         name: imageUri.split("/").pop(),
//       });
//       // console.log({uri : photo.uri, type: "image/jpg", name : photo.uri.split("/").pop()})
//       const result = await axios.post(
//         "https://liked-assured-vulture.ngrok-free.app/send_image",
//         form_data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(result.data.hasil);
//       setHasil(result.data.hasil)
  
//       const historyList = await AsyncStorage.getItem('history')
//       if (historyList == null) {
//           AsyncStorage.setItem('history', JSON.stringify([{uri: imageUri, result: result.data.hasil}]))
//           return; 
//       }
//       const parsedHistoryList = JSON.parse(historyList)
//       parsedHistoryList.push({uri: imageUri, result: result.data.hasil})
//       AsyncStorage.setItem('history', JSON.stringify(parsedHistoryList))
//       } catch (error) {
//       console.log(error);
//      }
//   };

  
  // Function to handle capturing image from camera
  const handleCapture = async () => {
    if (!cameraPermission) {
      Alert.alert('Permission Denied', 'Please grant camera permission to use this feature.');
      return;
    }

    if (!cameraRef.current) {
      console.error('Camera reference is not defined.');
      return;
    }

    const photo = await cameraRef.current?.takePictureAsync();
    if (!photo || !photo.uri) {
      console.error('Failed to take picture or uri is undefined.');
      return;

    
    }
    // console.log(photo);
    // try {
    //   const form_data = new FormData()
    //   form_data.append("file", {uri : photo.uri, type: "image/jpg", name : photo.uri.split("/").pop()})
    //   console.log({uri : photo.uri, type: "image/jpg", name : photo.uri.split("/").pop()})
    //   const result = await axios.post("https://liked-assured-vulture.ngrok-free.app/send_image", form_data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(result.data)
    // } catch (error) {
    //   console.log(error)
    // }
    const asset = await createAssetAsync(photo.uri);

    setImageUri(asset.uri);

    // Save the captured image to a specific directory
    saveImage(photo.uri);
  };

  // Function to handle picking image from gallery
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant media library permission to use this feature.');
      return;
    }

    let imagepicker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    
    if (!imagepicker.canceled){
      setImageUri(imagepicker.assets.at(0).uri)

    }

    // setImageUri(imagepicker.uri);
  };

  // Function to save the image to a specific directory
  const saveImage = async (imageUri) => {
    try {
      const folderPath = `${FileSystem.documentDirectory}file/file_foto`;
      const fileName = imageUri.split('/').pop(); // Extract file name from imageUri
      const newPath = `${folderPath}/${fileName}`; // Construct new path

      // Ensure the directory exists
      const dirInfo = await FileSystem.getInfoAsync(folderPath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
      }

      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });

      Alert.alert('Image Saved', 'The image has been saved successfully.');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Save Failed', 'Failed to save the image.');
    }
  };

  // Function to close the emotion identification page
  const handleClose = () => {
    navigation.goBack();
  };

  const handleProcessImage = async () => {
    // processImage(imageUri).then(()=> {})
    // Navigasi ke halaman baru dan kirimkan imageUri sebagai parameter
    navigation.navigate('Identifikasi_Emosi_2', { imageUri});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.buttonText}>Tutup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.processButton} onPress={handleProcessImage}>
          <Text style={styles.buttonText}>Proses Gambar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cameraContainer}>
        <View style={styles.cameraView}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.cameraImage} />
          ) : (
            <CameraView
              style={styles.cameraPreview}
              ratio="16:9"
              ref={cameraRef}
              facing='front'
            />
          )}
        </View>
        {!imageUri && (
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <View style={styles.captureInnerButton} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.importButton} onPress={handlePickImage}>
          <Text style={[styles.buttonText, { color: '#4D869C' }]}>Import Gambar</Text>
        </TouchableOpacity>
        {imageUri && (
          <TouchableOpacity style={styles.retakeButton} onPress={() => setImageUri(null)}>
            <Text style={[styles.buttonText, { color: '#4D869C' }]}>Ambil Ulang Gambar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    padding: 10,
  },
  processButton: {
    padding: 10,
  },
  buttonText: {
    color: '#4D869C',
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
  },
  cameraImage: {
    width: '100%',
    height: '100%',
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#4D869C',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInnerButton: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  importButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  retakeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

