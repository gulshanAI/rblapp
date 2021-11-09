import React  from 'react'
import { View, Text,} from 'react-native';
import styles from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper'
import Comment from './Comment';
import Docs from './Docs';

const LinearHome = ({ loadInfo }) => {
    return (
        <LinearGradient
        colors={['#0468DD', '#AACBEB']}
        style={styles.header}>   
            <View>
                <Text style={styles.LoadDetail}>Load: #{loadInfo.loadNumber}</Text> 
                <View style={styles.deliveryDetails}>
                    <View style={{marginHorizontal:20}}>
                        <Text style={styles.state}>{loadInfo.pickUpState}</Text>
                        <Text style={styles.city}>{loadInfo.pickUpCity.cityName}</Text>
                    </View>
                    <View style={{marginHorizontal:20, justifyContent:'center'}}>
                        <FontAwesome name='long-arrow-right' size={25} color='white' />
                    </View>     
                    <View style={{marginHorizontal:20}}>
                        <Text style={styles.state}>{loadInfo.destinationState}</Text>
                        <Text style={styles.city}>{loadInfo.destinationCity.cityName}</Text>
                    </View>
                </View>
                <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:30, marginBottom:10}}>
                    <Text style={styles.bottomText}> Pick up: {loadInfo.pickDateRead} </Text>
                    <Text style={styles.bottomText}> Delivere On: {loadInfo.deliveryDateRead}</Text>
                </View>
            </View>
        </LinearGradient>
    )
}

const OtherInfo = ({ loadInfo }) => {
    const chekcStatus = (status) => status == "RECEIVED" ? "ASSIGNED" : status
    const checkPayrollUpdated = payroll => payroll ? "Payroll released" : "Payroll Not yet released"
    return (
        <>
            <View style={styles.truckDetails}>
                <Text style={{fontSize:16}}>Truck Number: </Text>
                <Text style={{fontWeight:'bold',fontSize:16}}> {loadInfo.truck} </Text>
            </View>
            <View style={[styles.truckDetails, styles[loadInfo.deliveryStatus] ]}>
                <Text style={{fontSize:16}}>Delivery Status: </Text>
                <Text style={{fontWeight:'bold',fontSize:16}}> {chekcStatus(loadInfo.deliveryStatus)} </Text>
            </View>
            <View style={[styles.truckDetails, styles.payroll ]}>
                <Text style={{fontSize:16}}>Payroll Status: </Text>
                <Text style={{fontWeight:'bold',fontSize:16}}> {checkPayrollUpdated(loadInfo.payRollUpdated)} </Text>
            </View>
            
            <View style={styles.addressContainer}>
                <View style={styles.addressMark}>
                    <FontAwesome name='circle' size={12} color='blue'/> 
                    <Text style={styles.pickText}>Pick up</Text>
                </View>
                <Text style={styles.addressText}>{loadInfo.pickUpLocation}</Text>
                <View style={styles.addressMark}>
                    <FontAwesome name='circle' size={12} color='green' />
                    <Text style={styles.pickText}>Drop At</Text>
                </View>
                <Text style={styles.addressText}> {loadInfo.destination}</Text>
            </View> 

            <View style={styles.box}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.boxText}>Load Type: </Text>
                    <Text style={{fontWeight:'bold',...styles.boxText}}>{loadInfo.loadType}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.boxText}>Dead Head: </Text>
                    <Text style={{fontWeight:'bold',...styles.boxText}}> {loadInfo.dh} Miles</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.boxText}>Practicle Hours: </Text>
                    <Text style={{fontWeight:'bold',...styles.boxText}}> {loadInfo.practical} Miles</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.boxText}>Partner Type: </Text>
                    <Text style={{fontWeight:'bold',...styles.boxText}}> {loadInfo.partnerType} </Text>
                </View>
            </View>
            
            <View style={styles.namecontainer}>
                <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:20}}> 
                    <View style={styles.userBox}>
                        <View>
                            <Text style={{fontSize:14, color:'white', marginTop: 0}}> {loadInfo.driver1.first_name} {loadInfo.driver1.last_name} </Text>
                        </View>
                    </View>
                    <View style={styles.userBox}>
                        <View>
                            <Text style={{fontSize:14, color:'white', marginTop: 0}}>{loadInfo.driver2 !== null ? `${loadInfo.driver2.first_name} ${loadInfo.driver2.last_name}` : "None"}</Text>
                        </View>
                    </View>

                </View>
            </View>
            <Comment message={loadInfo.comment}/>
            <Docs 
                Contractfile={loadInfo.contractFile}
                mapfile={loadInfo.mapFile}
                other1={loadInfo.other1}
                other2={loadInfo.other2}
            />
        </>
    )
}

export {
    LinearHome,
    OtherInfo
};