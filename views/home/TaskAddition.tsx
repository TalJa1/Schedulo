import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../services/useStatusBarCustom';

const TaskAddition = () => {
  useStatusBar('#1940B6');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>TaskAddition</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskAddition;

const styles = StyleSheet.create({
  container: {flex: 1},
});
