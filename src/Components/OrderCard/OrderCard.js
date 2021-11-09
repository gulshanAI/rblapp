import React from 'react';
import { View, Text, Pressable, Image} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OrderCard = (props) => {
    return (
    <Pressable onPress={props.onSelect}>
        <View style={styles.container}>
          <View style={styles.view1}>
            <Image 
              style={{width: 40,height: 40, marginLeft: 10}}
              source= {require('./Truck.png')}
            />
            <View style={{marginTop: 10,}}>
              <Text style={{fontSize: 16, fontWeight:'bold'}}> {props.loadNo}  </Text>
            </View>
            <View style={{marginTop:5 , marginRight: 5}}>
              <Ionicons name='checkmark-circle' color='green' size={22} />
            </View>
          </View>
          <View style={styles.addressMark}>
              <FontAwesome name='map-marker' size={22} color='#2C51A2' />
              <Text style={styles.pickText}> Drop : 
              <Text style={{fontSize: 15, fontWeight:'500'}}> {props.DropAt}  </Text> 
              </Text>
          </View>

          <View style={{flexDirection:'column', marginRight:30, marginTop:10}}>
            <Text style={styles.txtstyle}> <FontAwesome name="table" size={20} color='grey' />  Delivered On : <Text>{props.dropDate} </Text>
            </Text>
          </View>

          <View style={{flexDirection:'row', marginLeft: 15}}>
            <View style={{marginTop: 10}}>
              <FontAwesome name='cubes' size={22} color='grey' /> 
            </View>
            <Text style={{...styles.txtstyle, fontWeight:'bold', marginLeft: 5}}> 
              Partner Type : <Text style={{fontWeight:'400', fontSize: 14}}> {props.LoadType} </Text>
            </Text>
          </View>
        </View>
    </Pressable>  
    )
}

export default OrderCard;