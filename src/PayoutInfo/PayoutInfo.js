import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import HeaderDetail from '../Components/PayInfo/HeaderDetail';
import {Total} from '../Components/PayInfo/Total';
import TrackSheet from '../Components/PayInfo/TrackSheet';
import authAPi from '../../api/auth';
import Loader from '../Components/Loader'
import { Avatar, HStack, Box, Center, NativeBaseProvider } from "native-base"

const PayoutInfo = ({route}) => {

    const payNo = route.params;
    const [payDetail, setPaydetail] = useState({});
    const [loadlist, setloadlist] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const getData = async() => {
        const result = await authAPi.paySheet(payNo);
        if(!result.ok) return alert('Something Went Wrong!!');
        setPaydetail(result.data);
        setloadlist(result.data.payTrackSheet);
        setLoading(false);
    }
    useEffect(() => {
        getData();
    },[])
    
    if(loading)
        return <Loader />
    return (
   <ScrollView>
        <HeaderDetail
           startOn={payDetail.startOnRead}
           finishOn={payDetail.endOnRead}
        />
<Box bg="info.100" p="1" pl="5">
    <HStack space={2}>
        <Avatar
            bg="coolGray.800"
            source={{
                uri: payDetail.driverName.image,
            }}>
        </Avatar>
        <View>
            <Text style={{fontSize: 16, fontWeight:'bold'}}>{payDetail.driverName.name}</Text>
            <Text style={{fontSize: 14, paddingTop: 5}}>{payDetail.driverName.staffId}</Text>
        </View>
    </HStack>
</Box>


       {
           loadlist.map((load, index) => {
               return <TrackSheet 
               key={index}     
               loader = {load}
               />
           })
        }

        <Total
         payDetail = {payDetail}
        />

        </ScrollView>
    )
}

export default PayoutInfo;

const styles = StyleSheet.create({})
