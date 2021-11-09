import React, { useContext, useEffect, useState } from 'react'
import DashboardList from '../Components/DashboardList';
import authApi from '../../api/auth';
import Loader from '../Components/Loader'
import { RefreshControl, ScrollView, Text } from 'react-native';

const DashBoard = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDashboard(0, true)
  }, []);

  const getDashboard = async(countTime = 0, refreshing=false) => {
    let result = await authApi.dashboardData();
    console.log(result)
    if(!result.ok){
      if(countTime < 4){
        getDashboard(countTime+1, refreshing)
      }
      else{
        console.log("Not abl")
      }
    }
    else{
      setData(result.data);
      setLoading(false);
      if(refreshing)
        setRefreshing(false)
    }
  }
  useEffect(() => {
    getDashboard();
  },[]);
  
  if(loading)
    return <Loader />
  return(
    <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } >
        <DashboardList data={data} />
    </ScrollView>
      
  )
}

export default DashBoard;