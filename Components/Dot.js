import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Animated ,{useAnimatedStyle} from 'react-native-reanimated';


const Dot = (props) => {



    const dotStyle=useAnimatedStyle(()=>{

        const isActive=props.index===props.activeIndex.value;

        return {
            backgroundColor:isActive?'grey':'white'
        }
    });


    

    return (
        <Animated.View style={[styles.container,dotStyle]}  />
    )
}

export default Dot;

const styles = StyleSheet.create({
    container: {
        width:20,
        height:20,
        borderRadius:10,
        borderColor:'grey',
        borderWidth:1,
        margin:1
    }
})
