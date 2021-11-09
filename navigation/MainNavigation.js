import React, { useContext, useEffect, useState, useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import LoadTabNavigator from './LoadTabNavigator';
import Tab from './tabs';
import Info from '../src/Info/Info';
import ChangePassword from '../src/ChangePassword/ChangePassword';
import OfflineNotice from '../src/Components/OfflineNotice';
import PayoutInfo from '../src/PayoutInfo/PayoutInfo';
import DeliveredInfo from '../src/Info/DeliveredInfo';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
// import {useNavigation} from '@react-navigation/native'
import authApi from '../api/auth';
import {navigationRef} from './RootNav';
import navigation from './RootNav'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});
const MainNavigation = () => {
  const Stack = createStackNavigator();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  // const navigation = useNavigation();
  
  useEffect(() => {
      registerForPushNotificationsAsync().then(token => {
        console.log(token)
        authApi.storeToken(token);
        setExpoPushToken(token)
      });
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        let data =response.notification.request.trigger.remoteMessage.data
        let bodyData = JSON.parse(data.body)
        navigation.navigate(bodyData.link, bodyData.data)
      });
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
  },[]);

  return (
      <NavigationContainer ref={navigationRef} >
          <Stack.Navigator>
              <Stack.Screen 
              name='V-Stock Delivery Boy'
              component={Tab}
              />

              <Stack.Screen 
                 name='Load Info'
                 component={Info}
              />
              <Stack.Screen
                  name='Reset Password'
                  component={ChangePassword}
              />

              <Stack.Screen
                  name='Pay Info'
                  component={PayoutInfo}
              />

              <Stack.Screen 
                  name='Delivered Info'
                  component = {DeliveredInfo}
              />

          </Stack.Navigator>
      </NavigationContainer>
  )
}
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
export default MainNavigation;