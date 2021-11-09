import React from 'react'
import { View, Text, TouchableWithoutFeedback, Image,} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ShowData = ({icon, title, value}) => {
    return (
        <View style={styles.addressMark}>
            <FontAwesome name={icon} size={16} color='#2C51A2' />
            <Text style={styles.pickText}>{title}: </Text><Text style={{fontWeight:'400'}}>{value} </Text> 
        </View>
    )
}

const OnGoing = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onSelect}>
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Image 
                        style={{width: 35,height: 35}}
                        source= {require('../OrderCard/Truck.png')}
                    />
                    <View style={{margin:10, justifyContent:'space-between',width:"75%", flexDirection:'row',}}>
                        <View>
                            <Text style={{fontSize: 14, fontWeight:'bold'}}>{props.data.subOrderUId}</Text>
                        </View>
                    </View>
                </View>
                <ShowData icon='map-marker' title='Destination' value={props.data.location.destination} />
                <ShowData icon='calendar' title='Expected Delivery' value={props.data.expectedDelivery} />
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <ShowData icon='product-hunt' title='Product' value={props.data.productItem.count} />
                    <ShowData icon='th' title='Qty' value={props.data.productItem.amount.qty__sum} />
                </View>
            </View>
        </TouchableWithoutFeedback>  
    )
}
export default OnGoing;