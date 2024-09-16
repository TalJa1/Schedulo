import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle} from '../../services/styleSheet';

const PromoSegment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>PromoSegment</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromoSegment;

const styles = StyleSheet.create({
  container: containerStyle,
});
