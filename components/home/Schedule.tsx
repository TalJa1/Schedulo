/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SchedulePageProps} from '../../services/typeProps';
import {generateFormattedDate} from '../../services/timeServices';
import {centerAll, vh, vw} from '../../services/styleSheet';
import {generateScheduleData} from '../../services/renderData';

const Schedule: React.FC<SchedulePageProps> = ({
  selectedDay,
  weekDayIndex,
  todayIndex,
}) => {
  console.log('Schedule', selectedDay, weekDayIndex, todayIndex);

  return (
    <View style={styles.container}>
      <Text style={{color: '#000000', fontSize: 14, fontWeight: '700'}}>
        {generateFormattedDate(weekDayIndex)}
      </Text>
      <View>
        {weekDayIndex <= todayIndex ? <TodayView /> : <NoContentView />}
      </View>
    </View>
  );
};

const TodayView: React.FC = () => {
  return (
    <View
      style={{
        paddingHorizontal: vw(5),
        rowGap: vh(2),
        marginVertical: vh(2),
      }}>
      {generateScheduleData().map((item, index) => {
        return (
          <View key={index} style={{flexDirection: 'row', height: vh(10)}}>
            <View style={{height: '100%', justifyContent: 'space-between'}}>
              <Text style={styles.time}>{item.from}</Text>
              <Text style={styles.time}>{item.to}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const NoContentView: React.FC = () => {
  return (
    <View
      style={[
        centerAll,
        {paddingHorizontal: vw(5), rowGap: vh(2), marginVertical: vh(2)},
      ]}>
      <Text
        style={{
          color: '#1940B6',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Hãy tạo kế hoạch cho ngày CUỐI TUẦN nào!!
      </Text>
      <Image
        style={{width: vw(50), height: vw(50), resizeMode: 'contain'}}
        source={require('../../assets/home/schedule.png')}
      />
      <TouchableOpacity
        disabled={true}
        style={{
          borderWidth: 1,
          borderColor: '#2F2F2F',
          paddingVertical: vh(1),
          paddingHorizontal: vw(5),
          borderRadius: 10,
        }}>
        <Text style={{color: '#2F2F2F', fontSize: 16, fontWeight: '400'}}>
          Tạo kế hoạch
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: vw(5),paddingBottom:vh(2)},
  time: {color: '#878787', fontSize: 12, fontWeight: '300'},
});
