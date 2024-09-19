import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TaskAdditionComponent from '../../components/home/TaskAdditionComponent';

const ChallengeAddition = () => {
  return (
    <TaskAdditionComponent title="Việc cần làm mới" subInput={<SubInput />}>
      <View>
        <MainInput />
      </View>
    </TaskAdditionComponent>
  );
};

const MainInput = () => {
  return (
    <View style={styles.container}>
      <Text>MainInput</Text>
    </View>
  );
};

const SubInput = () => {
  return (
    <View>
      <Text>SubInput</Text>
    </View>
  );
};

export default ChallengeAddition;

const styles = StyleSheet.create({
  container: {backgroundColor: 'transparent'},
});
