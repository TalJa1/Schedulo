/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChallengeComponentProps} from '../../services/typeProps';
import {vw} from '../../services/styleSheet';

const Challenge: React.FC<ChallengeComponentProps> = ({
  handleNavigate,
  selectedDay,
  tabCurrentIndex,
  todayIndex,
  weekDayIndex,
  challengeData,
}) => {
  console.log(
    'Challenge',
    selectedDay,
    tabCurrentIndex,
    todayIndex,
    weekDayIndex,
  );

  return (
    <View style={styles.container}>
      {todayIndex > weekDayIndex ? (
        <PastDayView />
      ) : challengeData[weekDayIndex] &&
        challengeData[weekDayIndex][0] &&
        challengeData[weekDayIndex][0].title === '' ? (
        <EmptyView />
      ) : (
        <ContentView />
      )}
    </View>
  );
};

const EmptyView: React.FC = () => {
  return (
    <View>
      <Text>Challenge</Text>
    </View>
  );
};

const ContentView: React.FC = () => {
  return (
    <View>
      <Text>Challenge</Text>
    </View>
  );
};

const PastDayView: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: vw(5),
        columnGap: vw(5),
      }}>
      <Image
        style={{width: vw(30), height: vw(30), resizeMode: 'contain'}}
        source={require('../../assets/home/noContent.png')}
      />
      <Text
        style={{color: '#1940B6', fontSize: 20, fontWeight: '700', flex: 1}}>
        Tốt lắm! Bạn đã hoàn thành thử thách!
      </Text>
    </View>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {flex: 1},
});
