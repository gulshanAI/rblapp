import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const Completebutton = () => {
    return (
        <Pressable
        style={styles.button}>

        <Text style={{fontSize: 12, color:'green'}}> Completed  </Text>
    </Pressable>
    )
}

export default Completebutton
 

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        width: 90,
        height: 30,
        borderRadius:15,
        borderColor:'green',
        justifyContent:'center',
        alignItems:'center',
    }
})