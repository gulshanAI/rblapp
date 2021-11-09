import React from 'react'
import LottieView from 'lottie-react-native';

const ActivityIndicator = ({visible = false, count}) => {

    if(!visible) return null;

    return <LottieView 
            autoPlay
            loop
            source={require('../../assets/Animations/loading.json')} 
            />
}

export default ActivityIndicator
