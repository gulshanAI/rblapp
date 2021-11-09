import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import FormButton from '../Components/FormButton'
import AntDesign from 'react-native-vector-icons/AntDesign';
import authApi from '../../api/auth';
import Loader from '../Components/Loader'

const ChangePassword = ({navigation}) => {
    const [old, setold] = useState('');
    const [newpass1, setNew1] = useState('');
    const [newpass2, setNew2] = useState('');
    const [loading, setLoading] = useState(false);

    const changepass = async() => {
      setLoading(true);
      const res = await authApi.changePassword(old, newpass1, newpass2);
      if(res.ok) {
        alert('Password changed Successfully');
        setold('');
        setNew1('');
        setNew2('');
        navigation.goBack();
      } else {
        alert('Failed To update the password')
      }
      setLoading(false);
    }


    const onsubmit = () => {
      if(newpass1 == newpass2){
        changepass();
      }else{
        return alert('Failed To change password please the new passwords are not matching')
      }
    }

    if(loading)
        return <Loader />
  return (
  <View style={{marginHorizontal:10, marginVertical:-20}}>

      <View style={{paddingVertical: 60, marginHorizontal: 20}}> 
          <Text style={{fontSize:28, fontWeight:'bold'}}> Change Password </Text>
      </View>


      <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
              <AntDesign name='lock'  size={25} color='#666' />
      </View>

          <TextInput 
            value={old}
              secureTextEntry={true}
              style={styles.input}
              numberOfLines={1}
              placeholder="Enter Old Password"
              placeholderTextColor='#666'
              onChangeText={(txt) => setold(txt)}   
            />

      </View>
      <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
              <AntDesign name='unlock'  size={25} color='#666' />
          </View>

          <TextInput 
            value={newpass1}
              secureTextEntry={true}
              style={styles.input}
              numberOfLines={1}
              placeholder="Enter New Password"
              placeholderTextColor='#666'
              onChangeText={(txt) => setNew1(txt)}   
            />

      </View>


      <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
              <AntDesign name='unlock'  size={25} color='#666' />
          </View>

          <TextInput 
            value={newpass2}
              secureTextEntry={true}
              style={styles.input}
              numberOfLines={1}
              placeholder="Enter New Password Again"
              placeholderTextColor='#666' 
              onChangeText={(txt) => setNew2(txt)}  
            />

      </View>


      <View style={{marginHorizontal: 40}}>
          <FormButton buttonTitle="Change Password" onPress={onsubmit} />
      </View>
      </View>
  )
}

export default ChangePassword;

const styles =  StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: Dimensions.get('window').height / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
})