import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants';
import {useNetInfo} from '@react-native-community/netinfo';

const OfflineNotice = () => {

    const netInfo = useNetInfo();

    if(netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
    return (
        <View style={styles.container}>
            <Text style={{color:'#ffffff'}}>No Internet Connection</Text>
        </View>
    );

    return null;
}



export default OfflineNotice;


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#1E2034',
        height: 50,
        position: "absolute",
        top: Constants.statusBarHeight,
        width:'100%',
        zIndex: 1,
        alignItems:'center',
        justifyContent:'center'
    }

})

