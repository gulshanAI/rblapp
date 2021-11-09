import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

const Loader = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#34495E" />
    </View>
);

export const Updating = ({OnDone, progress=0}) => {
      return (
        <Modal visible={true}>
          <View style={styles2.container}>
          { progress < 1 ? <Progress.Bar color="#2C51A2" progress={progress} width={300} /> 
          : <LottieView 
              source={require('../../assets/Animations/done.json')}
              autoPlay
              loop={false}
              onAnimationFinish={OnDone}
              style={styles2.animation}
            />
          }
          { progress < 1 ? <Text>Please Wait..! Changing Status is Being Proccesed</Text>:<Text>Delivery Status Changes</Text>}
          </View>
        </Modal>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const styles2 = StyleSheet.create({
  container:{
      alignItems:'center',
      justifyContent: 'center',
      flex:1
  },
  animation:{
      height: 150,
      width: 150
  }
})


export default Loader