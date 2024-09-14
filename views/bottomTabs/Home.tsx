import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle} from '../../services/styleSheet';
import useStatusBar from '../../services/useStatusBarCustom';
import HeaderComponent from '../../components/home/HeaderComponent';

const Home = () => {
  useStatusBar('#363851');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <HeaderComponent />
          <Text>Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: containerStyle,
});
