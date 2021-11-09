import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, } from 'react-native'
import OnGoing from '../Components/OnGoing/OnGoing'
import authApi from '../../api/auth';
import {useNavigation} from '@react-navigation/native';
import NoLoads from '../Components/NoLoads';
import Loader from '../Components/Loader'
import {logutUser} from '../../api/logout'
import {AuthContext} from '../Components/context';

const Upcoming = () => {
    const [order, setOrder] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()
    const {Token, setToken} = useContext(AuthContext);

    const [fetch, setFetch] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [param, setParam] = useState({'orderStatus': 'DELIVERED'});
   
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
        const data = await authApi.staffOperation(param);
        if(data.ok){
            setLoading(false)
            if(refresh)
                setOrder(data.data.results);
            else
                setOrder([...order, ...data.data.results]);
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
        }
        else{
            console.log("Finish")
            setLoadMore(false)
        }
    }
    const reloadNow = () => {
        let params = param
        params['page'] = 1
        setParam(params)
        setOrder([]);
        setLoading(true); 
        setRefresh(true)
        setFetch(fetch + 1);
    }
    useEffect(() => {
        getData();
    },[fetch])
    if(loading)
        return <Loader />
    return (
        <View style={styles.home}>
            <FlatList
                data = {order}
                keyExtractor={(order) => order.slug.toString()}
                renderItem={({item}) =>  (
                      <OnGoing data={item} onSelect={() => navigation.navigate('Load Info', item.slug)} />
                    )
                }
                ListEmptyComponent={<NoLoads />}
                refreshing={refreshing}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.5}
                onRefresh={() => reloadNow()}
                ListFooterComponent = {() => loadMore && <Text style={{textAlign:"center", fontWeight:"900"}}> Loading ... </Text>}
            />
        </View>
    )
}
export default Upcoming;
const styles = StyleSheet.create({
    home:{
        height: '100%',
        backgroundColor: '#ECE9E1'
    },
})