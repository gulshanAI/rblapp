import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import {FontAwesome} from 'react-native-vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, HStack, Box } from "native-base"

const PayDetail = ({itemData, isDriver, onClick}) => {
    const payStyle = itemData.payReleases ? "done": "notDone"
    return (
        <Pressable onPress={onClick}>
            <View style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%' }}>
                    <Text style={styles.txt}>From : {itemData.startOnRead} </Text>
                    <Text style={styles.txt}>To : {itemData.endOnRead} </Text>
                </View>
                { !isDriver &&
                    <Box bg="info.100" p="1" pl="5" style={{width:'100%' }}>
                        <HStack space={2}>
                            <Avatar
                                bg="coolGray.500"
                                source={{
                                    uri: itemData.driverName.image,
                                }}>
                            </Avatar>
                            <View>
                                <Text style={{fontSize: 14, fontWeight:'bold', paddingTop: 5}}>{itemData.driverName.name}</Text>
                                <Text style={{fontSize: 12, paddingTop: 2}}>{itemData.driverName.staffId}</Text>
                            </View>
                        </HStack>
                    </Box>
                }
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%' }}>
                    <Text style={styles.txt}><FontAwesome name="road" size={25} color="black" /> DH : {itemData.totalDH} Miles</Text>
                    <Text style={styles.txt}><FontAwesome name="truck" size={25} color="black" /> Prc : {itemData.totalPractical} Miles</Text>
                </View>
                <Text style={styles.txt}><FontAwesome5 name="calendar-week" size={24} color="black" />  Week : {itemData.weekNumber} ({itemData.year})</Text>
                <Text style={styles.txt}><FontAwesome name="money" size={22} color="black" /> 
                    <Text style={{color:'green', fontWeight:'bold', fontSize: 14}}>  Amount : ${itemData.finalAmount} </Text> 
                </Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%' }}>
                    <Text style={[styles.txt, styles.paytype]}> {itemData.payType} </Text>
                    <Text style={[styles.txt, styles[payStyle]]}> 
                        <Text style={{color:'#fff', fontWeight:'bold'}}> {itemData.payReleases ? `Paid` : `Not Paid`} </Text> 
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default PayDetail;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E9EAF5',
        margin: 15,
        alignItems:'flex-start',
        borderLeftWidth: 5,
        borderLeftColor:'#5A62CE',
        shadowColor: '#8C8E8E',
        shadowOffset:{
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 3
    },
    
    txt:{
        margin:5,
        fontSize: 14,
        fontWeight:'bold',
        color:'#494F57',
    },
    paytype:{
        backgroundColor: '#F1C40F',
        padding: 3,
        borderRadius: 4
    },
    done:{
        backgroundColor: '#1E8449',
        padding: 3,
        borderRadius: 4
    },
    notDone:{
        backgroundColor: '#E74C3C',
        padding: 3,
        borderRadius: 4,
        color:'#fff',
    }
})