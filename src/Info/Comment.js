import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Comment = ({message}) => {
   const checkMessage = msg => msg ? msg : '---'
    return (
        <View 
        style={styles.commentContainer}>
            <Text style={styles.comentTitle}>Comment: </Text>
            <Text style={styles.message}>{checkMessage(message)}</Text>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
     commentContainer:{
        backgroundColor:'#E9E9E9', 
        marginVertical:10, 
        marginHorizontal: 10, 
        borderRadius:15
     },

     comentTitle:{
        marginVertical:3, 
        marginHorizontal: 25, 
        fontWeight:'bold', 
        fontSize:15
     },

     message:{
        marginLeft: 35,
        marginVertical: 5,
     }
})
