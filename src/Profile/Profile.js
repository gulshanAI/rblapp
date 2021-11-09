import React, {useContext, useState, useEffect} from 'react'
import { View, SafeAreaView, Alert} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple, Text} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native'
import {AuthContext} from '../Components/context';
import authStorage from "../../api/storage";
import Loader from '../Components/Loader'

const Profile = () => {
    const [user, setUser] = useState("");
    const navigation = useNavigation();
    const authcontext = useContext(AuthContext);
    const handleLogout = () => {
        authStorage.removeToken();
        authcontext.setToken(null);
        authcontext.setIsDriver(null);
    }
    useEffect(() => {
        if(typeof(authcontext.Token) != "object")
            setUser(JSON.parse(authcontext.Token))
        else
            setUser(authcontext.Token)
    },[]);
    if(!user)
        return <Loader />
    return (        
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row', marginTop:25}}>
                    <Avatar.Image 
                        source={{ uri:`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.user.name}` }}
                        size={80}
                    />

                    <View style={{marginLeft:20, }}>
                    <Title style={[styles.title, {
                        marginTop:15,
                        marginBottom: 5,
                        marginLeft:-7
                    }]}> {user.user.company} </Title>
                    <Caption style={styles.caption}>Name: {user.user.name}</Caption>
                    </View>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}></View>
                <TouchableRipple onPress={() => navigation.navigate('Reset Password')}>
                        <View style={styles.menuItem}>
                            <Icon name='lock-reset' color='#0292EA' size={30} />
                            <Text style={styles.menuItemText}>Change Password</Text>
                        </View>  
            
                </TouchableRipple>
                <TouchableRipple onPress={handleLogout}>
                        <View style={styles.menuItem}>
                            <Icon name='logout' color='black' size={30} />
                            <Text style={styles.menuItemText}>Logout</Text>
                        </View>  
                </TouchableRipple>
        </SafeAreaView>
    )
}

export default Profile
