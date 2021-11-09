import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const HeaderDetail = (props) => {
    return (
        <View style={styles.container1}>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-around'}}>

            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>Started</Text>
            <Text style={{fontSize: 14, color:'white'}}>{props.startOn} </Text>
            </View>

            <View style={{marginTop:7}}>
            <FontAwesome name="long-arrow-right" size={30} color="white" />
            </View>

            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>Ended</Text>
            <Text style={{fontSize: 14, color:'white'}}>{props.finishOn} </Text>
            </View>

            </View>
            </View>
    )
}

export default HeaderDetail

const styles = StyleSheet.create({
    container1:{
        height:60,
        backgroundColor:'#2C51A2',
        alignItems:'center',
        justifyContent:'center'
    }
})
