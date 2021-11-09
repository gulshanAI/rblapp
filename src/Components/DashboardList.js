import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native'
import {ChartDashboard, BarDashboard} from './Chart'

const ShowBox = (props) => {
  const goTo = (nav, link) => {
    if(nav)
      nav.navigate("Loads", {screen: link})
  }
  return (
    <TouchableOpacity onPress={(() => goTo(props.nav, props.link))}>
      <View style={styles[props.container]} >
          <Text style={styles.title}> <FontAwesome name={props.icon} size={25}/> {props.name} </Text>
          <Text style={styles.amount}> {props.data} </Text>
      </View>
    </TouchableOpacity>
  )
}

const Rows = ({name, value}) => {
  return(
      <View style={{flex: 1, flexDirection:"row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor:"#F2F4F4", paddingVertical: 4, flexWrap: "nowrap"}}>
          <View><Text style={{fontWeight: "700", textTransform: "uppercase"}}>{value.subOrderUId}</Text></View>
          <View><Text>Prd: {value.productItem.count}</Text></View>
          <View><Text>Qty: {value.productItem.amount.qty__sum}</Text></View>
      </View>
  )
}
const WrapLayout = ({children, heading}) => {
  return (
      <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 5, marginVertical: 5}}>
            <View style={{backgroundColor:"#ccc", padding: 9,}}>
                <Text style={{fontSize:14, fontWeight:"bold"}}>{heading}</Text>
            </View>
            <View style={{padding: 9}}>
                {children}
            </View>
      </View>
  )
}
const DetailBox = ({heading, data}) => {
  return (
      <WrapLayout heading={heading}>
          {
              data.length ? 
              Object.keys(data).map((e, i) => <Rows key={i} name={e} value={data[e]} />)
              :
              <Text style={{textAlign: "center"}}>No Order Found</Text>
          }
      </WrapLayout>
  )
}

const DashboardList = ({data}) => {
  const navigation = useNavigation();
  return (
      <ScrollView style={{backgroundColor:'#F0EFF2'}}>
        <View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
            <ShowBox container="container1" name="Received" icon="th-large" data={data.received} nav={navigation} link="Received" />
            <ShowBox container="container1" name="Dispatch" icon="cubes" data={data.dispatch} nav={navigation} link="Dispatch" />
          </View>
        </View>
        <View style={{ padding: 15}}>
            <DetailBox heading="Currently Running Order" data={data.runningOrder} />
            <DetailBox heading="New Order assigned" data={data.newOrder} />
        </View>
    </ScrollView>
  )
}
export default DashboardList

const styles = StyleSheet.create({
    container1: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#34495E',
        height: 150,
        marginVertical: 10,
        borderRadius:15,
        overflow: "hidden",
        width: 170,
        margin: 10
      },
      container5: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#34495E',
        borderRadius:10,
        height: 150,
        marginVertical: 10,
        overflow: "hidden",
        // width: '90%',
        margin: 20
      },
      containerSmall: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#34495E',
        borderRadius:10,
        marginVertical: 5,
        marginHorizontal: 2,
        overflow: "hidden",
        padding: 5,
        paddingVertical: 10,
        width: 100
      },
    
      title:{
        color:'white',
        fontSize:20
      },
      smallTitle:{
        color:'white',
        fontSize:11
      },
    
      amount:{
        color:'white',
        fontSize: 25,
      },
      smallAmount:{
        color:'white',
        fontSize: 15,
      }
})
