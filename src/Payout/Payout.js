import React, { useState, useContext} from 'react'
import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import authApi from '../../api/auth';
import PayDetail from '../Components/PayDetail';
import {useNavigation} from '@react-navigation/native';
import Loader from '../Components/Loader'
import {AuthContext} from '../Components/context';
import {logutUser} from '../../api/logout'

const NoPayout = () => {
  return (
    <View style={{flex: 1, backgroundColor:'white', padding: 55}}>
        <Text style={{textAlign:'center', fontWeight: '700', fontSize:16}}>Currently no Payout Found</Text>
    </View>
  )
}
const WeekNumber = ({week, selected, toFire}) => {
    return (
      <TouchableOpacity style={{backgroundColor: selected == week ? '#F1C40F' : '#ccc', paddingVertical: 5, paddingHorizontal: 25, marginHorizontal: 5, marginVertical: 2, borderRadius: 5}} onPress={() => toFire(week) } >
            <Text style={{textAlign:'center', fontWeight: '700', fontSize:14}}>{week}</Text>
      </TouchableOpacity>
    )
  }
const Payout = () => {
    const [week, setWeek] = useState(["All",39,40,41,42,43,44,45]);
    const [weeksel, setWeeksel] = useState("All");
    const [payDetail, setPayDetail] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const {Token, setToken} = useContext(AuthContext);
    const [isDriver, setIsDriver] = useState(false);
    const [fetch, setFetch] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [param, setParam] = useState({});

    const authcontext = useContext(AuthContext);

    const extractGetData = (urlData) => {
        let url = urlData.split("?")[1]
        let datas = {}
        url.split('&').forEach(function(val){
            let data = val.split("=")
            datas[data[0]] = data[1]
        })
        return datas;
    }
    const getNext = (url) => {
        const urlData = extractGetData(url)
        return urlData['page']
    }
    const getData = async () => {
        const data = await authApi.payDetails(param);
        if(data.ok){
            setLoading(false)
            if(refresh)
                setPayDetail(data.data.results);
            else
                setPayDetail([...payDetail, ...data.data.results]);
            let next = null
            if(data.data['next']){
                next = getNext(data.data['next'])
            }
            let params = param
            params['page'] = next
            setRefresh(false)
            setParam(params)
        }
        else{
            if(data.status == 401)
                logutUser(setToken)
        }

    }
    const handleOnEndReached = async() => {
        if(param.page !== null){
            setLoadMore(true)
            setFetch(fetch + 1);
            // await getData()
        }
        else{
            console.log("Finish")
            setLoadMore(false)
        }
    }
    const getByWeek = (week) => {
        setWeeksel(week)
        if(week != "All")
            setParam({'endWeekNumber': week})
        else
            setParam({})
        setPayDetail([]);
        setLoading(true); 
        setRefresh(true)
        setFetch(fetch + 1);
    }
    const reloadNow = () => {
        let params = param
        params['page'] = 1
        setParam(params)
        setPayDetail([]);
        setLoading(true); 
        setRefresh(true)
        setFetch(fetch + 1);
    }
    useEffect(() => {
        // getData();
        setIsDriver(authcontext.isDriver)
    },[])

    useEffect(() => {
        getData();
    },[fetch])

    if(loading)
        return <Loader />

    return (
        <View style={{flex: 1, backgroundColor:'white'}}>
                {/* { isDriver &&
                    <View style={{flex: 1, flexDirection:'row', backgroundColor:'red'}}>
                        <Text>Un-Paid</Text>
                        <Text>Paid</Text>
                    </View>
                } */}
            <View>
                { !isDriver &&
                    <View>
                        <FlatList 
                            data={week}
                            keyExtractor={(week) => week.toString()}
                            renderItem={({item}) =>
                                <WeekNumber week={item} selected={weeksel} toFire={getByWeek} />
                            }
                            horizontal={true}
                        />
                    </View>
                }

            </View>
            <View style={{paddingBottom: 35}}>
                <FlatList 
                    data={payDetail}
                    keyExtractor={(payDetail) => payDetail.payRollId.toString()}
                    renderItem={({item}) =>
                        <PayDetail itemData={item} isDriver={isDriver}
                        onClick={() => navigation.navigate('Pay Info', item.payRollId)}
                        /> 
                    }
                    refreshing={refreshing}
                    onEndReached={handleOnEndReached}
                    onEndReachedThreshold={0.5}
                    onRefresh={() => reloadNow()}
                    ListEmptyComponent={<NoPayout />}
                    ListFooterComponent = {() => loadMore && <Text style={{textAlign:"center", fontWeight:"900"}}> Loading ... </Text>}
                />
            </View>
        </View>
    )
}

export default Payout;

const styles = StyleSheet.create({
    title:{
        marginLeft: 20,
        marginTop:10,
        fontSize:28,
        fontWeight:'bold',
    },
})
