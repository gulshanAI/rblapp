import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Upcoming from '../src/LoadScreens/Upcoming';
import Ongoing from '../src/LoadScreens/Ongoing';
import Completed from '../src/LoadScreens/Completed';

const LoadTabNavigator = () => {
    const Tab = createMaterialTopTabNavigator();
    return(
        <>        
            <Tab.Navigator tabBarOptions={{
                    activeTintColor: 'white',
                    indicatorStyle:{
                        backgroundColor: 'white',
                    },
                    style:{
                        backgroundColor: '#2C51A2',
                        height:55,
                    }
                }}>
                <Tab.Screen name={"Received"} component={Upcoming} />
                <Tab.Screen name={"Dispatched"} component={Ongoing} />
                <Tab.Screen name={"Delivered"} component={Completed} />
            </Tab.Navigator> 
        </>
     )
}
export default LoadTabNavigator;