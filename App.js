import React, { useEffect, useState } from 'react';
import StackNavigator from  './navigation/StackNavigator';
import {AuthContext} from './src/Components/context';
import authStorage from './api/storage';
import MainNavigation from './navigation/MainNavigation';
// import {navigationRef} from './navigation/RootNav';
import authApi from './api/auth';
import OfflineNotice from './src/Components/OfflineNotice';
import Loader from './src/Components/Loader'
import { SafeAreaView } from 'react-native';
import { NativeBaseProvider, Text, Box } from 'native-base';

const App = () => {
    const [Token, setToken] = useState();
    const [isDriver, setIsDriver] = useState(false);
    const [loading, setLoading] = useState(true);
    const restoreToken = async() => {
        const authToken = JSON.parse(await authStorage.getToken());
        setLoading(false);
        if(!authToken) {
         setToken(false);
         return false;
        }
        setToken(authToken);
        console.log(authToken.staffType);
        setIsDriver(authToken.staffType == "DRIVER" ? true : false);
    }
     useEffect(() => {
      restoreToken();
     }, []);

     if(loading)
      return <Loader />
    return (
            <>
            <NativeBaseProvider>
              <AuthContext.Provider value={{Token, setToken, isDriver, setIsDriver }}>
                <SafeAreaView style={{flex: 1}}>
                  <OfflineNotice />
                  {Token ? <MainNavigation /> : <StackNavigator />}
                  </SafeAreaView>
              </AuthContext.Provider>
              </NativeBaseProvider>
            </>
    );
}

export default App;