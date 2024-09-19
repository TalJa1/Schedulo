/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ChallengeComponentProps, ChallengeItem} from '../../services/typeProps';
import {vh, vw} from '../../services/styleSheet';
import CheckBox from '@react-native-community/checkbox';

const Challenge: React.FC<ChallengeComponentProps> = ({
  handleNavigate,
  selectedDay,
  tabCurrentIndex,
  todayIndex,
  weekDayIndex,
  challengeData,
}) => {
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
        <EmptyView handleNavigate={handleNavigate} />
      ) : (
        <ContentView />
      )}
    </View>
  );
};

const EmptyView: React.FC<{handleNavigate: () => void}> = ({
  handleNavigate,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: vw(5),
        marginVertical: vh(2),
        alignItems: 'center',
        rowGap: vh(2),
      }}>
      <Text
        style={{
          color: '#1940B6',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Tạo thử thách cho bản thân đi chứ? Cải thiện sức khỏe thì sao?
      </Text>
      <Image
        style={{width: vw(50), height: vw(50), resizeMode: 'contain'}}
        source={require('../../assets/home/challenge1.png')}
      />
      <TouchableOpacity
        onPress={handleNavigate}
        style={{
          borderWidth: 1,
          borderColor: '#2F2F2F',
          borderRadius: 10,
          paddingVertical: vw(2),
          paddingHorizontal: vw(5),
        }}>
        <Text style={{color: '#2F2F2F', fontSize: 16}}>Tạo thử thách</Text>
      </TouchableOpacity>
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
