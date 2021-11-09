import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function TotalInside({name, value, styleName=""}) {
    return (
        <View style={{width: '100%', flexDirection:'row', justifyContent:'space-between', borderBottomWidth: 1, borderBottomColor:'#DDDEE1'}}>
            <Text style={{margin: 20, fontWeight:'bold', fontSize: 16}}>{name} </Text>
            <Text style={[{margin: 20, fontSize: 16}, styleName && styles[styleName], styles.txtStyle]}> {value} </Text>  
        </View>
    )
}

const Total = ({payDetail}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={{margin: 15 , fontWeight:'bold', fontSize: 26}}>Details  </Text>
            </View>
        <View>
            <TotalInside name="Sub Total" styleName="blue" value={payDetail.totalAmount ? "$"+payDetail.totalAmount : "$0"} />
            <TotalInside name="Adjustment" styleName={payDetail.totalDeduction > 0 ? "green" : "red"} value={payDetail.totalDeduction ? "$"+payDetail.totalDeduction : "$0"} />
            <TotalInside name="Total" styleName="green" value={payDetail.finalAmount ? "$"+payDetail.finalAmount : "$0"} />
            <TotalInside name="Payment Released" styleName={payDetail.payReleases ? "paymentReleased" :"paymentNotReleased"} value={payDetail.payReleases ? "Yes" : "No"} />
            <TotalInside name="Week" styleName="" value={payDetail.weekNumber} />
            <TotalInside name="Year" styleName="" value={payDetail.year} />
            <TotalInside name="Pay Type" styleName="" value={payDetail.payType} />
            <TotalInside name="Total DH" styleName="" value={payDetail.totalDH+" Miles"} />
            <TotalInside name="Total Practical" styleName="" value={payDetail.totalPractical+" Miles"} />
        </View>
        </View>
    )
}

const Deduction = ({payDetail}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={{margin: 15 , fontWeight:'bold', fontSize: 26}}>Adjustment  </Text>
            </View>
        <View>
            <TotalInside name="Sub Total" styleName="blue" value={payDetail.totalAmount ? "$"+payDetail.totalAmount : "$0"} />
            <TotalInside name="Adjustment" styleName={payDetail.totalDeduction > 0 ? "green" : "red"} value={payDetail.totalDeduction ? "$"+payDetail.totalDeduction : "$0"} />
        </View>
        </View>
    )
}

export { Total, Deduction}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderBottomColor:'#D3D3d3',
        borderBottomWidth: 5
    },
    txtStyle: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    blue: {
        color:'#fff',
        fontWeight:'bold',
        backgroundColor: '#2471A3',
    },
    red: {
        color:'#fff',
        fontWeight:'bold',
        backgroundColor: '#C0392B',
    },
    green: {
        color:'#fff',
        fontWeight:'bold',
        backgroundColor: '#229954',
    },
    paymentReleased: {
        color:'#fff',
        fontWeight:'bold',
        backgroundColor: '#1ABC9C',
    },
    paymentNotReleased: {
        color:'#fff',
        fontWeight:'bold',
        backgroundColor: '#E74C3C',
    },
})
