import * as SecureStore from 'expo-secure-store';

const key = "authToken";

const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync(key, authToken);
        console.log('store token', authToken)
    } catch (error) {
        console.log('Error storing token', error);
    }
}
const storeData = async (name, value) => {
    try {
        await SecureStore.setItemAsync(name, value);
    } catch (error) {
        console.log('Error storing token', error);
    }
}

const getData = async(name) => {
    try {
        return await SecureStore.getItemAsync(name);        
    } catch (error) {
        console.log('Error Getting the Token',error);
    }
}

const getToken = async() => {
    try {
        return await SecureStore.getItemAsync(key);        
    } catch (error) {
        console.log('Error Getting the Token',error);
    }
}


const removeToken = async() => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log('Error Removing the Token',error);
    }
}


export default {
    getToken,
    removeToken,
    storeToken,
    storeData,
    getData
}