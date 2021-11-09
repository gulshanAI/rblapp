import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 9
        
      },
      header: {
          flex: 1,
      },

      footer: {
          flex: 1,
          backgroundColor: 'white',
          paddingVertical: 20
      },

      deliveryDetails:{
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'center',
        paddingTop:30
      },
      LoadDetail:{
        color: 'white', 
        fontSize:20, 
        textAlign: "center",
        marginVertical:5,
        fontWeight:'700'
      },
      Fromto:{
        color:'white',
        fontSize:14, 
        fontWeight:'bold'
      },

      city:{
        marginBottom:2, 
        color:'white', 
        fontSize:16
      },
    
      state:{
        color:'white', 
        fontSize:22, 
        fontWeight:'bold'
      },

      bottomText:{
        paddingHorizontal: 10, 
        color:'#2C51A2', 
        fontSize:16, 
        fontWeight:'bold',
        marginTop: 10 
      },


      namecontainer:{
        backgroundColor:'#2C3E50', 
        marginHorizontal: 10,
        borderRadius: 15,
        borderWidth:1,
        borderColor:'#2C3E50',
        marginTop: 10,
        paddingBottom: 15
      },

      nameText:{
        color:"white", 
        fontSize:17 , 
        marginLeft:10,
        marginTop: 10
      },

      addressContainer:{
        backgroundColor:'#EDEFF3', 
        marginHorizontal:10, 
        paddingTop: 5,
        borderRadius:15,
        paddingBottom: 25
      },

      addressMark:{
        marginLeft: 12, 
        marginTop:15, 
        flexDirection:'row', 
        justifyContent:'flex-start'
      },
      RECEIVED:{
        backgroundColor: '#BA4A00',
        color: "white"
      },
      ONGOING:{
        backgroundColor: '#1F618D',
        color: "white"
      },
      DELIVERED:{
        backgroundColor: '#1E8449',
        color: "white"
      },
      payroll:{
        backgroundColor: '#5499C7',
        color: "white"
      },
      addressText:{
        marginLeft:45, 
      },

      pickText:{
        marginLeft:7, 
        // fontWeight:'bold'
      },

      dileveryContainer: {
        backgroundColor:'#F4F6F6', 
        marginHorizontal: 10,
        // fontWeight:'bold',
        borderRadius: 15,
        marginTop: 20,
        paddingBottom: 15
      },
      
      truckDetails:{
        height: 40, 
        backgroundColor:'#EBC77E', 
        marginVertical:5 , 
        marginHorizontal: 10,
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },

      imagePreview:{
        width: '100%',
        height: 200,
        marginTop: 20,
        marginBottom: 10,
        justifyContent:'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },

    image:{
        width:'100%',
        height: '100%'
    },

    orderButton:{
      marginTop: 10,
      width: '100%',
      padding: 15,
      backgroundColor: '#04B662',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
    },
    orderText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff'
    },

    box:{
      backgroundColor:'#F2F4F4', 
      marginHorizontal: 10,
      borderRadius: 15,
      marginTop: 10,
      paddingVertical: 15,
      paddingHorizontal: 10
    },
    boxText:{
      color:"#000", 
      fontSize:15 , 
      marginLeft:5,
      marginTop: 10
    },
    userBox:{
      display: "flex",
      alignItems: "center",
      alignContent: "center"
    },
    inputLabel:{
      fontSize: 14, 
      fontWeight:'bold', 
      marginTop: 10
    }
});


export default styles;