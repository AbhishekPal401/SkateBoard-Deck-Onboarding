import React from 'react'
import { StyleSheet, Text, View,Dimensions, Image} from 'react-native';
import Animated,{useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

const {width,height} =Dimensions.get('window');

const PAGE_WIDTH=width;

const PAGE_HEIGHT=height;

const CIRCLE_RADIUS=PAGE_WIDTH*0.7;

const Page = (props) => {

    const index=props.index;
    const inputRange=[(index-1)*PAGE_WIDTH,index*PAGE_WIDTH,(index+1)*PAGE_WIDTH];

    const circleStyle =useAnimatedStyle(()=>{

        

        const scale=interpolate(props.translateX.value,inputRange,[0,1,0],Extrapolate.CLAMP);
        

        return {
            transform:[{scale}]
        }
    })

    const imageStyle =useAnimatedStyle(()=>{

        const progress=interpolate(props.translateX.value,inputRange,[-1,0,1],Extrapolate.CLAMP);
        const opacity=interpolate(props.translateX.value,inputRange,[0,0.8,0],Extrapolate.CLAMP);

        return {
            opacity,
            transform:[{rotate:`${progress*Math.PI}rad` }]
        }
    })
    


    return (
        <View style={styles.container}>
            <Animated.View style={styles.circleContainer}>
            <Animated.View style={[styles.circle,circleStyle]}/>
            <Animated.Image source={props.page.source} style={[styles.image,imageStyle]} resizeMode={'contain'}/>
            </Animated.View>
            <Text style={styles.title}>{props.page.title}</Text>
            <Text style={styles.description}>{props.page.description}</Text>
            
        </View>
    )
}

export default Page;

const styles = StyleSheet.create({
    container: {
        width:PAGE_WIDTH,
        height:PAGE_HEIGHT,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:50,

    },
    circleContainer: {
        width:CIRCLE_RADIUS,
        aspectRatio:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:120
    },
    circle: {
        width:CIRCLE_RADIUS,
        height:CIRCLE_RADIUS,
        borderRadius:CIRCLE_RADIUS/2,
        aspectRatio:1,
        backgroundColor:'white'

    },
    image: {
        height:PAGE_HEIGHT/2,
        position:'absolute'
    },
    title: {
        fontSize:40,
        textAlign:'center',
        marginBottom:20,
        fontWeight:'700'
    },
    description: {
        fontSize:14,
        textAlign:'center',
        color:'grey'
    },
    
})
