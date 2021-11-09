import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Payout from '../src/Payout/Payout';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import DashBoard from '../src/Dashboard/DashBoard';
import LoadTabNavigator from './LoadTabNavigator';
import Profile from '../src/Profile/Profile';

const Tab = () => {

    const Tab = createBottomTabNavigator();

    return(
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                     style:{height:60 }
                }}
            >
                <Tab.Screen 
                name="DashBoard" 
                component={DashBoard} 
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={{alignItems:'center', justifyContent: 'center'}}>
                            <Image 
                            source={require('./icons/dashboard.png')}
                            resizeMode="contain"
                            style={{
                                width:22,
                                height: 22,
                                tintColor: focused ? '#2C51A2' : '#748c94'
                            }}
                            />
                        <Text style={{color:focused ? '#2C51A2' : '#748c94', fontSize: 12}}>
                            DashBoard
                        </Text>
                        </View>
                    )
                }}
                />

                <Tab.Screen 
                name="Orders" 
                component={LoadTabNavigator}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={{alignItems:'center', justifyContent: 'center'}}>
                            <Image 
                             source={require('./icons/container.png')}
                             resizeMode="contain"
                             style={{
                                 width:25,
                                 height: 25,
                                 tintColor: focused ? '#2C51A2' : '#748c94'
                             }}
                            />
                        <Text style={{color:focused ? '#2C51A2' : '#748c94', fontSize: 12}}>
                            Orders
                        </Text>
                        </View>
                    )
                }}
                
                />

                <Tab.Screen 
                name="Profile" 
                component={Profile}   
                options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center', justifyContent: 'center'}}>
                        <Image 
                         source={require('./icons/user.png')}
                         resizeMode="contain"
                         style={{
                             width:25,
                             height: 25,
                             tintColor: focused ? '#2C51A2' : '#748c94'
                         }}
                        />
                    <Text style={{color:focused ? '#2C51A2' : '#748c94', fontSize: 12}}>
                        Profile
                    </Text>
                    </View>
                )
            }} />
            </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset:{
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tab;