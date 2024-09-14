/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {vh, vw} from '../../services/styleSheet';
import {homeNotiIcon, nextIcon} from '../../assets/svgXML';
import {getCurrentMonthAndYear} from '../../services/timeServices';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <UserMain />
      <HeaderTime />
    </View>
  );
};

const HeaderTime: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: vw(5),
        justifyContent: 'space-between',
      }}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', columnGap: vw(2)}}>
        <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
          {getCurrentMonthAndYear()}
        </Text>
        {nextIcon(vw(4), vw(4))}
      </View>
      <Text style={{color: 'white'}}>Hôm qua</Text>
    </View>
  );
};

const UserMain: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: vw(5),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: vw(2),
          alignItems: 'center',
        }}>
        <Image source={require('../../assets/home/avatar.png')} />
        <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '700'}}>
          Minh Khôi
        </Text>
      </View>
      {homeNotiIcon(vw(10), vw(10))}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363851',
    paddingVertical: vh(1),
    rowGap: vh(1),
  },
});
