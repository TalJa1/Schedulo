/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useStatusBar from '../../services/useStatusBarCustom';
import {centerAll, containerStyle, vh, vw} from '../../services/styleSheet';
import {floatingBtnIcon} from '../../assets/svgXML';

const Promodoro = () => {
  useStatusBar('#1940B6');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Header />
        <View>
          <Text>Promodoro</Text>
        </View>
        <FloatingActionButton />
      </ScrollView>
    </SafeAreaView>
  );
};

const FloatingActionButton: React.FC = () => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: vh(15),
        right: vw(5),
        backgroundColor: '#1940B6',
        padding: vw(3),
        borderRadius: vw(20),
        zIndex: 2,
      }}>
      <Text style={{color: 'white'}}>{floatingBtnIcon(vw(8), vw(8))}</Text>
    </TouchableOpacity>
  );
};

const HeaderAbsoluteView: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{position: 'absolute', zIndex: 2, left: -vw(5), top: -vh(2.5)}}>
        <Image source={require('../../assets/promodoro/clock.png')} />
      </View>
      <View
        style={{
          borderWidth: 2,
          borderColor: 'white',
          backgroundColor: '#F5C443',
          paddingHorizontal: vw(15),
          paddingVertical: vh(1),
          borderRadius: 10,
        }}>
        <Text style={{color: '#2F2F2F', fontSize: 16}}>Tìm hiểu thêm</Text>
      </View>
    </View>
  );
};

const Header: React.FC = () => {
  return (
    <View
      style={[
        {
          backgroundColor: '#1940B6',
          paddingHorizontal: vw(5),
          paddingTop: vh(5),
          paddingBottom: vh(7),
          rowGap: vh(2),
        },
        centerAll,
      ]}>
      <Image
        style={styles.imgheader}
        source={require('../../assets/promodoro/headerclock.png')}
      />
      <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: '700'}}>
        Đồng hồ Pomodoro
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '400',
        }}>
        Phương pháp Pomodoro, một cách quản lý thời gian đơn giản nhưng hiệu
        quả, giúp bạn tập trung và nâng cao năng suất.
      </Text>
      <View style={{position: 'absolute', bottom: -vh(3)}}>
        <HeaderAbsoluteView />
      </View>
    </View>
  );
};

export default Promodoro;

const styles = StyleSheet.create({
  container: containerStyle,
  imgheader: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
