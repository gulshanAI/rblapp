import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const NoLoads = () => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#787878', marginTop:50, marginHorizontal: 30}}>
                Currently No Loads Found In This Process
            </Text> 
        </View>
    )
}

export default NoLoads;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center', 
        alignItems:'center'
    }
})
