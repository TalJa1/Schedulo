/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {vh, vw} from '../../services/styleSheet';
import {homeNotiIcon} from '../../assets/svgXML';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <UserMain />
      <HeaderTime />
    </View>
  );
};

const HeaderTime: React.FC = () => {
  return <View></View>;
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
  },
});
