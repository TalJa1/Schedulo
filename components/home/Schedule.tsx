/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SchedulePageProps} from '../../services/typeProps';
import {generateFormattedDate} from '../../services/timeServices';
import {vw} from '../../services/styleSheet';

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
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: vw(5)},
});
