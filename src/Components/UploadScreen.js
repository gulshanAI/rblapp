import React from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

const UploadScreen = ({OnDone, progress = 0, visible = false}) => {
    return (
        <Modal visible={visible}>
        <View style={styles.container}>
        { progress < 1 ? <Progress.Bar color="#2C51A2" progress={progress} width={300} /> 
        : <LottieView 
            source={require('../../assets/Animations/done.json')}
            autoPlay
            loop={false}
            onAnimationFinish={OnDone}
            style={styles.animation}
        /> 
        
        }

        {
            progress < 1 ? <Text>Please Wait..! Changing Status is Being Proccesed</Text>
            :
            <Text>Load Status Changes</Text>

        }
        </View>
        </Modal>
    )
}

export default UploadScreen;

const styles = StyleSheet.create({

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
