import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';

const DeliveredDoc = ({ imageUri, onChangeImage }) => {
    const handlePress = () => {
      if (!imageUri) selectImage();
      else
        Alert.alert("Delete", "Are you sure you want to delete this image?", [
          { text: "Yes", onPress: () => onChangeImage(null) },
          { text: "No" },
        ]);
    };
    const selectImage = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync()
        if (!result.cancelled) onChangeImage(result.uri);
      } catch (error) {
        console.log("Error reading an image", error);
      }
    };
  

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <Ionicons color="#273746" name={imageUri ? 'document-outline' : 'attach'} size={30} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: '#ECF0F1',
      borderRadius: 15,
      height: 75,
      justifyContent: "center",
      marginVertical: 10,
      overflow: "hidden",
      width: 75,
    },
    image: {
      height: "100%",
      width: "100%",
    },
  });
  
  export default DeliveredDoc;
  