import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderRadius:10, 
    borderColor: '#8C8E8E',
    shadowColor: '#8C8E8E',
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowOffset:{
        width: 5,
        height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 3
  },
  container2: {
    backgroundColor: '#F7F7F7',
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderRadius:10, 
    borderColor: '#8C8E8E',
    shadowColor: '#8C8E8E',
    shadowOffset:{
        width: 5,
        height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 3
  },

    view1:{
       flexDirection: 'row',
    },

    txtstyle:{
      fontSize:16,
      fontWeight:'600',
      color:'#222222',
      marginVertical: 8,
      marginRight: 20,
      marginLeft: 10
    },

    addressMark:{
      marginVertical:5, 
      flexDirection:'row',
      flexWrap: 'wrap',
      justifyContent:'flex-start'
    },
    

    pickText:{
      marginLeft:7, 
      fontWeight:'bold'
    },
    managerBox:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    manageBoxView:{
      paddingVertical:4,
      paddingHorizontal:15,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    manageBoxText:{ 
      fontWeight: "700"
    },
    manageBoxTextNormal: {
      color: "#2C3E50"
    }
  })

export default styles;
