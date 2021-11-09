import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from '../src/Login/Login';
import Tab from './tabs';
import OfflineNotice from '../src/Components/OfflineNotice';

const StackNavigator = (props) => {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Login" 
                component={Login} 
                options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
       
        </NavigationContainer>
    )
}

export default StackNavigator;
