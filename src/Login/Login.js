import React, {useContext, useState} from 'react';
import styles from './styles';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StatusBar,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {AuthContext} from '../Components/context';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather';
import authApi from '../../api/auth';
import authStorage from "../../api/storage";
import Loader from '../Components/Loader'
import { Linking } from 'react-native';

const Login = ({navigation}) => {
      //const navigation = useNavigation();
      const [data, setData] = useState({
        username:'progulu@gmail.com',
        password: 'aaaaaaaa',
        check_textInputChange: false,
        secureTextEntry: true
      })
      const [loading, setLoading] = useState(false);
      const authcontext = useContext(AuthContext);
      const loginHandle = async () => {
        setLoading(true); 
        const result = await authApi.login(data.username, data.password);
        if (!result.ok) {
          setLoading(false); 
          return Alert.alert("Login Failed" ,"Please Check your Username and Password");
        }
        const user = result.data;
        authcontext.setToken(JSON.stringify(user));
        authStorage.storeToken(JSON.stringify(result.data));
      }
      const textInputChange = (val) => {
        if(val.length !== 0) {
          setData({
            ...data,
            username: val,
            check_textInputChange: true
          })
        } else {
          setData({
            ...data,
            username: val,
            check_textInputChange: false
          })
        }
      }
      const passwordChange = (val) => {
        setData({
          ...data,
          password: val
        });
      }
      const updateSecureTextEntry = () => {
          setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
          });
      }
      // useEffect(() => {
      //   console.log(authcontext)
      // }, [])
      if(loading)
        return <Loader />
    return(
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
          <View style={styles.header}>
          <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Text style={styles.text_header}>Welcome !</Text>
          </View>


        <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}
        >
            <Text style={styles.text_footer}>Email Id</Text>
            <View style={styles.action}>
              <FontAwesome name='user' color='white' size={25} />

              <TextInput 
                placeholder='Your Email Id' 
                placeholderTextColor="#fff"  
                style={styles.textInput} 
                value={data.username}
                onChangeText={(val) => textInputChange(val)}
                autoFocus={true}
                autoCapitalize='none'
                keyboardType='email-address'
              />

              {data.check_textInputChange ?
              <Animatable.View animation="bounceIn">
              <Feather 
                name='check-circle'
                color='#4CDBE5'
                size={20}
              /> 
             </Animatable.View> :   null }

            </View>


            <Text style={[styles.text_footer, {marginTop: 30}]}>Password</Text>
            <View style={styles.action}>
              <FontAwesome 
              name='lock' 
              color='white' 
              size={25} />

              <TextInput 
              placeholder='Your Password' 
              secureTextEntry={data.secureTextEntry ? true : false}
              placeholderTextColor="#fff"  
              style={styles.textInput} 
              value={data.password}
              onChangeText={(val) => passwordChange(val)}
              />

            <TouchableOpacity
              onPress={updateSecureTextEntry}
            >
              {data.secureTextEntry ?
              <Feather 
                name='eye-off'
                color='#4CDBE5'
                size={20}
              /> 
              :
              <Feather name="eye" 
              color='#4CDBE5'
              size={20}  />
                }
              </TouchableOpacity>
            </View>
           
                <View style={styles.button}>
                <TouchableOpacity style={styles.signIn}  
                onPress={() => loginHandle()}>                  
                      <Text style={styles.textSign}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.link}>
                  <TouchableOpacity  onPress={() => Linking.openURL('https://management.rbl-inc.com/forgetpassword')}>                  
                      <Text style={styles.linkText}>Forgot Password ?</Text>
                  </TouchableOpacity>
                </View>
            
          </Animatable.View>
      </KeyboardAvoidingView>
    )
}

export default Login; 