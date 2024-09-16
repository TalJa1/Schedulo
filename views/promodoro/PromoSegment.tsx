/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {centerAll, containerStyle, vh, vw} from '../../services/styleSheet';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../services/typeProps';
import {
  cancelIcon,
  pauseICon,
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
  const relaxTime = 5 * 60; // 5 minutes in seconds
  const [remainingTime, setRemainingTime] = useState(segmentTime * 60); // Convert to seconds
  const [currentSegment, setCurrentSegment] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isRelaxing, setIsRelaxing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            if (isRelaxing) {
              setIsRelaxing(false);
              setCurrentSegment(prevSegment => prevSegment + 1);
              return segmentTime * 60; // Reset to segment time in seconds
            } else {
              setIsRelaxing(true);
              return relaxTime; // Reset to relax time in seconds
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current!);
  }, [isRunning, isRelaxing, currentSegment, segmentTime, relaxTime]);

  const handleRefresh = () => {
    setRemainingTime(segmentTime * 60);
    setIsRelaxing(false);
  };

  const handlePlayPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleStop = () => {
    setIsRunning(false);
    setCurrentSegment(1);
    setIsRelaxing(false);
    setRemainingTime(segmentTime * 60);
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <View style={{alignItems: 'center', rowGap: vh(3)}}>
      <AnimatedCircularProgress
        lineCap="round"
        style={{borderRadius: vw(20)}}
        size={vw(70)}
        width={15}
        fill={
          (remainingTime / (isRelaxing ? relaxTime : segmentTime * 60)) * 100
        }
        tintColor={isRelaxing ? '#FF6347' : '#59C3A1'} // Change color based on segment type
        backgroundColor={isRelaxing ? '#F9DAD8' : '#D0E8EB'}>
        {() => (
          <View>
            <Text style={[styles.timeText, isRelaxing && {color: '#E0483C'}]}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
            <Text style={{color: '#878787', textAlign: 'center'}}>
              {isRelaxing
                ? `Phiên nghỉ ${currentSegment}`
                : `${currentSegment}/4 phiên`}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={{color: '#878787', textAlign: 'center'}}>
        {isRelaxing
          ? 'Nghỉ ngơi 5 phút đi nàoooo'
          : `Tập trung trong vòng ${segmentTime} phút`}
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled={isRelaxing}
          style={[
            {
              backgroundColor: '#F1F1F1',
              borderRadius: vw(20),
              width: vw(10),
              height: vw(10),
            },
            centerAll,
          ]}
          onPress={handleRefresh}>
          {refreshIcon(vw(5), vw(5))}
        </TouchableOpacity>
        <TouchableOpacity disabled={isRelaxing} onPress={handlePlayPause}>
          {isRunning ? pauseICon(vw(15), vw(15)) : redPlayIcon(vw(15), vw(15))}
        </TouchableOpacity>
        <TouchableOpacity disabled={isRelaxing} onPress={handleStop}>
          {stopIcon(vw(10), vw(10))}
        </TouchableOpacity>
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
