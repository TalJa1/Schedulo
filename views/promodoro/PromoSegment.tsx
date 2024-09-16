/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {centerAll, containerStyle, vh, vw} from '../../services/styleSheet';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../services/typeProps';
import {
  cancelIcon,
  promoBackIcon,
  redPlayIcon,
  refreshIcon,
  stopIcon,
} from '../../assets/svgXML';
import useStatusBar from '../../services/useStatusBarCustom';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PromodoroPlayContent} from '../../services/renderData';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

type PromoSegmentRouteProp = RouteProp<RootStackParamList, 'PromoSegment'>;

const PromoSegment = () => {
  useStatusBar('white');
  const route = useRoute<PromoSegmentRouteProp>();
  const {segmentIndex} = route.params;

  return (
    <SafeAreaView style={[styles.container, {paddingHorizontal: vw(5)}]}>
      <ScrollView>
        <Header />
        <HeaderTitle segmentIndex={segmentIndex} />
        <Timer segmentIndex={segmentIndex} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Timer: React.FC<{segmentIndex: number}> = ({segmentIndex}) => {
  const {time} = PromodoroPlayContent[segmentIndex];
  const segmentTime = time / 4; // Divide the time into 4 segments
  const [remainingTime, setRemainingTime] = useState(segmentTime);
  const [currentSegment, setCurrentSegment] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          if (currentSegment < 4) {
            setCurrentSegment(prevSegment => prevSegment + 1);
            return segmentTime * 60; // Reset to segment time in seconds
          } else {
            clearInterval(timer);
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSegment, segmentTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <View style={{alignItems: 'center', rowGap: vh(3)}}>
      <AnimatedCircularProgress
        style={{borderRadius: vw(20)}}
        size={vw(70)}
        width={15}
        fill={(remainingTime / (segmentTime * 60)) * 100}
        tintColor="#59C3A1"
        backgroundColor="#D0E8EB">
        {() => (
          <View>
            <Text style={styles.timeText}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
            <Text style={{color: '#878787', textAlign: 'center'}}>
              {currentSegment}/4 phiên
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={{color: '#878787', textAlign: 'center'}}>
        Tập trung trong vòng {time} phút
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={[
            {
              backgroundColor: '#F1F1F1',
              borderRadius: vw(20),
              width: vw(10),
              height: vw(10),
            },
            centerAll,
          ]}>
          {refreshIcon(vw(5), vw(5))}
        </TouchableOpacity>
        <TouchableOpacity>{redPlayIcon(vw(15), vw(15))}</TouchableOpacity>
        <TouchableOpacity>{stopIcon(vw(10), vw(10))}</TouchableOpacity>
      </View>
    </View>
  );
};

const HeaderTitle: React.FC<{segmentIndex: number}> = ({segmentIndex}) => {
  return (
    <View
      key={segmentIndex}
      style={{
        marginVertical: vh(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white', // Ensure the background color is set for the shadow to be visible
        borderWidth: 4,
        borderColor: '#1940B6',
        padding: vw(2), // Add padding for better spacing
        borderRadius: 10, // Add border radius
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: vw(2),
        }}>
        <Image source={PromodoroPlayContent[segmentIndex].img} />
        <View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
            {PromodoroPlayContent[segmentIndex].title}
          </Text>
          <Text style={{color: 'black', fontSize: 14}}>
            {PromodoroPlayContent[segmentIndex].time} phút
          </Text>
        </View>
      </View>
    </View>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: vh(1),
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        {promoBackIcon(vw(10), vw(10))}
      </TouchableOpacity>
      <TouchableOpacity disabled>{cancelIcon(vw(10), vw(10))}</TouchableOpacity>
    </View>
  );
};

export default PromoSegment;

const styles = StyleSheet.create({
  container: containerStyle,
  timeText: {
    fontSize: 64,
    color: '#59C3A1',
    fontWeight: '700',
    textAlign: 'center',
  },
});
