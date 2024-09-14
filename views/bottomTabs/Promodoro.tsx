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
import {clockIcon, floatingBtnIcon, playIcon} from '../../assets/svgXML';
import {PromodoroPlayContent} from '../../services/renderData';

const Promodoro = () => {
  useStatusBar('#1940B6');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Header />
        <MainContent />
        <FloatingActionButton />
      </ScrollView>
    </SafeAreaView>
  );
};

const PlayContentContainer: React.FC = () => {
  return (
    <View style={{rowGap: vh(1)}}>
      {PromodoroPlayContent.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white', // Ensure the background color is set for the shadow to be visible
              borderRadius: 10, // Add border radius
              shadowColor: '#000', // Shadow color
              shadowOffset: {width: 0, height: 2}, // Shadow offset
              shadowOpacity: 0.25, // Shadow opacity
              shadowRadius: 3.84, // Shadow radius
              elevation: 5, // Elevation for Android shadow
              padding: vw(2), // Add padding for better spacing
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: vw(2),
              }}>
              <Image source={item.img} />
              <View>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
                  {item.title}
                </Text>
                <Text style={{color: 'black', fontSize: 14}}>
                  {item.time} phút
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: '#59C3A1',
                  borderRadius: vw(20),
                  width: vw(10),
                  height: vw(10),
                },
                centerAll,
              ]}>
              {playIcon(vw(6), vw(6), 'white')}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const CountButton: React.FC = () => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: '#7E7CEE',
          flexDirection: 'row',
          width: vw(70),
          paddingVertical: vh(1.5),
          borderRadius: vw(20),
          alignItems: 'center',
          columnGap: vw(2),
        },
        centerAll,
      ]}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
        Bấm giờ
      </Text>
      <View
        style={{borderRadius: vw(20), backgroundColor: 'black', padding: 3}}>
        {clockIcon(vw(7), vw(7))}
      </View>
    </TouchableOpacity>
  );
};

const MainContent: React.FC = () => {
  return (
    <View
      style={{paddingHorizontal: vw(5), marginVertical: vh(6), rowGap: vh(3)}}>
      <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
        Lịch sử
      </Text>
      <PlayContentContainer />
      <View style={centerAll}>
        <CountButton />
      </View>
    </View>
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
