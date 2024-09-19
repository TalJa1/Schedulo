import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Challenge: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Challenge</Text>
    </View>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {backgroundColor: 'transparent'},
});
