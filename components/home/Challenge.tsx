/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ChallengeComponentProps, ChallengeItem} from '../../services/typeProps';
import {vw} from '../../services/styleSheet';
import CheckBox from '@react-native-community/checkbox';

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
        <PastDayView
          data={challengeData[weekDayIndex]}
          isToday={todayIndex === weekDayIndex}
        />
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

const PastDayView: React.FC<{data: ChallengeItem[]; isToday: boolean}> = ({
  data,
  isToday,
}) => {
  const [checkedTasks, setCheckedTasks] = useState<{[index: number]: boolean}>(
    {},
  );

  const handleCheck = (index: number) => {
    setCheckedTasks(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <View>
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
      <View style={{paddingHorizontal: vw(5)}}>
        {data[0].title !== '' && (
          <>
            {data.map((value, index) => {
              return (
                <View key={index}>
                  <CheckBox
                    disabled={!isToday}
                    tintColors={{true: '#1940B6', false: '#D3D3D3'}}
                    value={checkedTasks[index] || false}
                    onValueChange={() => handleCheck(index)}
                  />
                  <View>
                    <Text>{value.title}</Text>
                    <Text>{value.aim}</Text>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </View>
    </View>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {flex: 1},
});
