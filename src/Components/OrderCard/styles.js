import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container: {
        height:200,
        backgroundColor: '#F7F7F7',
        marginVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1 ,
        borderRadius:10, 
        borderColor: 'grey',
        shadowColor: 'black',
        shadowOffset:{
            width: 50,
            height: 20,
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 5
      },

    view1:{
       flexDirection: 'row',
       justifyContent:'space-around'    
    },

    txtstyle:{
      fontSize:16,
      fontWeight:'600',
      color:'#222222',
      marginVertical: 8,
      marginHorizontal: 15,
      fontWeight:'bold'
    },

    addressMark:{
      marginLeft: 15, 
      marginTop:10, 
      marginRight: 15,
      flexDirection:'row', 
      justifyContent:'flex-start'
    },
    
    addressText:{
      marginLeft:35, 
      paddingHorizontal:30
    },

    pickText:{
      marginLeft:7, 
      fontWeight:'bold',
      fontSize: 15
    }
    
  })

export default styles;
