import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChallengeComponentProps} from '../../services/typeProps';

const Challenge: React.FC<ChallengeComponentProps> = ({
  handleNavigate,
  selectedDay,
  tabCurrentIndex,
  todayIndex,
  weekDayIndex,
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
      <Text>Challenge</Text>
    </View>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},
});
