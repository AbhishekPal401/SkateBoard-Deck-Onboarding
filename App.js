import React,{useCallback} from 'react';
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import Page from './Components/Page';
import {PAGES,BACKGROUND_COLOR} from './Constants/Constants';
import Animated,{useAnimatedScrollHandler,useSharedValue,useAnimatedStyle, useDerivedValue,useAnimatedRef} from 'react-native-reanimated';
import {AntDesign}from '@expo/vector-icons';
import Dot from './Components/Dot';

const {width,height} =Dimensions.get('window');

const PAGE_WIDTH=width;

const PAGE_HEIGHT=height;

export default function App() {


  

  const translateX=useSharedValue(0);
  const scrollRef = useAnimatedRef();

  const activeIndex=useDerivedValue(()=>{
    return Math.round(translateX.value/PAGE_WIDTH) 
  })

  const scrollHandler=useAnimatedScrollHandler({
    onScroll:(event)=>{
      translateX.value=event.contentOffset.x
    },
  });


  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) return;
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  }, []);


  return (
    <View style={styles.container}>
      <Animated.ScrollView style={{flex:1}} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={scrollHandler} scrollEventThrottle={16} ref={scrollRef} >
        {PAGES.map((item,index) => {
          return <Page key={index.toString() } page={item}  translateX={translateX}  index={index} />
        })}
      </Animated.ScrollView>

      <View style={styles.footer}>
                <View style={[styles.fillCenter,{flexDirection:'row'}]}>
                  {PAGES.map((_,index) => {
                    return <Dot key={index.toString()}  index={index} activeIndex={activeIndex} />
                  })}
                  
                </View>
                <View style={styles.fillCenter}><Text style={styles.text}>View Board</Text></View>
                <View style={styles.fillCenter}>
                  <AntDesign name="arrowright" size={24} color="black" onPress={onIconPress} />
                </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:14,
    fontWeight:'600',
    textTransform:'uppercase',
    letterSpacing:1.2
  },
});
