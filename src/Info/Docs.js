import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback,Image } from 'react-native'
import { Launch, Pdf } from 'react-native-openanything';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ShowDoc = ({name, file}) => {
  
  const openFile = (file) => {
    if(file)
      Pdf(file)
  }
  return (
      <View style={{flexDirection:'column'}}>
        <TouchableWithoutFeedback onPress={() => openFile(file)}>
          <View style={styles.container}>
            {!file ? <Text>No File</Text>
            : <MaterialCommunityIcons
                color="grey"
                name="file-document-outline"
                size={40}
              />
            }
          </View>
        </TouchableWithoutFeedback>
        <Text style={{textAlign:"center", fontWeight:'bold'}}>{name}</Text>
      </View>
  )
}
const Docs = (props) => {
    return (
    <View style={{width:'100%'}}>
      <View style={{flexDirection:'row',flex: 1, alignItems:'center', justifyContent:'space-evenly'}}>
        <ShowDoc name="Contract File" file={props.Contractfile} />
        <ShowDoc name="Map File" file={props.mapfile} />
        <ShowDoc name="File 1" file={props.other1} />
        <ShowDoc name="File 2" file={props.other2} />
      </View>
    </View>
    )
}

export default Docs;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#E9E9E9',
        borderRadius: 15,
        height: 80,
        justifyContent: "center",
        marginVertical: 10,
        marginHorizontal: 10,
        overflow: "hidden",
        width: 80,
      },
      image: {
        height: "100%",
        width: "100%",
      },
})
