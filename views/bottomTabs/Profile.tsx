import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle} from '../../services/styleSheet';
import useStatusBar from '../../services/useStatusBarCustom';

const Profile = () => {
  useStatusBar('#363851');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>Storage</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: containerStyle,
});
