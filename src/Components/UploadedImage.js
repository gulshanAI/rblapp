import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Web} from 'react-native-openanything';
import baseURL from '../../api/base'

const UploadedImage = ({ imageUri, ondelete }) => {
     const openFile = (file) => {
      if(file)
        Web(file)
    }
    return (
        <>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => openFile(baseURL+imageUri)}>
              <MaterialCommunityIcons style={styles.image} name="file" size={25} color="#000" />
            </TouchableWithoutFeedback>
          </View>
        </>
    );
   }
   
   const styles = StyleSheet.create({
     container: {
       alignItems: "center",
       backgroundColor: '#ECF0F1',
       borderRadius: 15,
       height: 70,
       justifyContent: "center",
       overflow: "hidden",
       width: 70,
     }
   });

export default UploadedImage;