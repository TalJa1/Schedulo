import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useStatusBar from '../../services/useStatusBarCustom';
import TaskAdditionComponent from '../../components/home/TaskAdditionComponent';

const TaskAddition = () => {
  useStatusBar('#1940B6');
  return (
    <TaskAdditionComponent title="Việc cần làm mới" subInput={<SubInput />}>
      <MainInput />
    </TaskAdditionComponent>
  );
};

const MainInput: React.FC = () => {
  return (
    <View>
      <Text>TaskAddition</Text>
    </View>
  );
};

const SubInput: React.FC = () => {
  return (
    <View>
      <Text>SubInput</Text>
    </View>
  );
};

export default TaskAddition;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  container: {flex: 1},
});
