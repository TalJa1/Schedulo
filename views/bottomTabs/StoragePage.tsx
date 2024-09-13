import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle} from '../../services/styleSheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../services/useStatusBarCustom';

const StoragePage = () => {
  useStatusBar('#363851');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>StoragePage</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoragePage;

const styles = StyleSheet.create({
  container: containerStyle,
});
