import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PayLoaderInside = ({name, value}) => <Text style={{fontSize:14, marginVertical: 8}}> <Text style={{fontWeight:'bold'}}> {name} : </Text>{value}</Text>

const TrackSheet = ({loader}) => {
    return (
        <View style={styles.container}>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', backgroundColor:'#D7E6FC'}}>
                <Text style={{margin: 10, fontSize: 16, fontWeight:'bold', marginLeft: 20, color: '#2C51A2'}}> {loader.loader} </Text>
                <View style={{flexDirection:'row', margin: 10, marginRight: 20}}>
                    <FontAwesome name="truck" size={25} color="black" />
                    <Text style={{fontSize: 16, fontWeight:'bold', marginLeft: 10, color:'#2C51A2'}}> 
                    {loader.truck}
                    </Text>
                </View>
            </View>

            <View style={{width: '100%', flexDirection:'row', paddingHorizontal:5, justifyContent:'space-between'}}>
                <PayLoaderInside name="Dead Head" value={loader.totalDH+" miles"} />
                <PayLoaderInside name="Practical" value={loader.totalPractical+" miles"} />
            </View>

            <View style={{width: '100%', flexDirection:'row', paddingHorizontal:5, justifyContent:'space-between'}}>
                <PayLoaderInside name="Delivered" value={loader.deliverDate} />
                <PayLoaderInside name="Partner" value={loader.partner} />
            </View>

            <View style={{width: '100%', flexDirection:'row', paddingHorizontal:5, justifyContent:'space-between'}}>
                <PayLoaderInside name="Amount" value={"$"+loader.totalAmount} />
            </View>
        </View>
    )
}
 
export default TrackSheet

const styles = StyleSheet.create({
  container:{
      backgroundColor:'white',
      borderBottomWidth: 3,
      borderBottomColor:'#DDDEE1',
      margin: 6
  }
})