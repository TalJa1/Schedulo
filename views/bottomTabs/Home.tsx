/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {centerAll, containerStyle, vh, vw} from '../../services/styleSheet';
import useStatusBar from '../../services/useStatusBarCustom';
import HeaderComponent from '../../components/home/HeaderComponent';
import {getTodayIndex} from '../../services/timeServices';
import {tabs} from '../../services/renderData';
import {floatingBtnIcon} from '../../assets/svgXML';

const Home = () => {
  useStatusBar('#363851');
  const [weekDayIndex, setWeekDayIndex] = useState(getTodayIndex());
  const [tabCurrent, setTabCurrent] = useState(0);
  const todayIndex = getTodayIndex();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <HeaderComponent
            dayIndex={weekDayIndex}
            setDayIndex={setWeekDayIndex}
          />
          <TabRender tabCurrent={tabCurrent} setTabCurrent={setTabCurrent} />
          {weekDayIndex < todayIndex && tabCurrent === 0 ? (
            <DoneTaskView />
          ) : (
            <></>
          )}
        </View>
        <FloatingActionButton />
      </ScrollView>
    </SafeAreaView>
  );
};

const DoneTaskView: React.FC = () => {
  return (
    <View
      style={[
        {paddingHorizontal: vw(10), rowGap: vh(4), marginTop: vh(2)},
        centerAll,
      ]}>
      <Text
        style={{
          color: '#1940B6',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Tốt lắm! Bạn đã hoàn thành các công việc đề ra trong ngày!
      </Text>
      <Image source={require('../../assets/home/noContent.png')} />
      <TouchableOpacity
        disabled
        style={{
          borderWidth: 1,
          borderColor: '#2F2F2F',
          borderRadius: 10,
          paddingHorizontal: vw(12),
          paddingVertical: vh(1),
        }}>
        <Text style={{color: '#2F2F2F', fontSize: 16}}>Xem lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const FloatingActionButton = () => {
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

const TabRender: React.FC<{
  tabCurrent: number;
  setTabCurrent: React.Dispatch<React.SetStateAction<number>>;
}> = ({tabCurrent, setTabCurrent}) => {
  return (
    <View
      style={{
        paddingHorizontal: vw(5),
        flexDirection: 'row',
        columnGap: vw(2),
        marginVertical: vh(1),
      }}>
      {tabs.map((tab, index) => {
        return (
          <TouchableOpacity
            onPress={() => setTabCurrent(index)}
            style={[
              styles.tabBtn,
              index === tabCurrent && {backgroundColor: '#363851'},
            ]}
            key={index}>
            <Text
              style={[styles.tabTxt, index === tabCurrent && {color: 'white'}]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: containerStyle,
  tabTxt: {
    color: '#363851',
    fontSize: 14,
    fontWeight: '400',
  },
  tabBtn: {
    borderWidth: 1,
    borderColor: '#363851',
    borderRadius: vw(20),
    padding: vw(2),
  },
});
