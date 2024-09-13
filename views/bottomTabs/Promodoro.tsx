import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useStatusBar from '../../services/useStatusBarCustom';
import {containerStyle} from '../../services/styleSheet';

const Promodoro = () => {
  useStatusBar('#363851');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>Promodoro</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Promodoro;

const styles = StyleSheet.create({
  container: containerStyle,
});
