/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {centerAll, containerStyle, vh, vw} from '../../services/styleSheet';
import useStatusBar from '../../services/useStatusBarCustom';
import HeaderComponent from '../../components/home/HeaderComponent';
import {getDayOfWeekByIndex, getTodayIndex} from '../../services/timeServices';
import {generateEmptyTaskData, tabs} from '../../services/renderData';
import {floatingBtnIcon} from '../../assets/svgXML';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeTaskBtnProps} from '../../services/typeProps';

const Home = () => {
  useStatusBar('#363851');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [weekDayIndex, setWeekDayIndex] = useState(getTodayIndex());
  const [selectedDay, setSelectedDay] = useState('');
  const [tabCurrent, setTabCurrent] = useState(0);
  const todayIndex = getTodayIndex();

  console.log('generateEmptyTaskData', generateEmptyTaskData());

  useEffect(() => {
    setSelectedDay(getDayOfWeekByIndex(weekDayIndex));
  }, [weekDayIndex]);

  const handleNavigate = () => {
    switch (tabCurrent) {
      case 0:
        navigation.navigate('TaskAddition');
        break;
      case 1:
        console.log('Navigate to challenge');
        break;
    }
  };

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
            <NoTaskView
              selectedDay={selectedDay}
              tabIndex={tabCurrent}
              handleNavigate={handleNavigate}
            />
          )}
        </View>
        <FloatingActionButton
          handleNavigate={handleNavigate}
          tabIndex={tabCurrent}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const NoTaskView: React.FC<
  HomeTaskBtnProps & {
    selectedDay: string;
  }
> = ({selectedDay, handleNavigate, tabIndex}) => {
  return (
    <View
      style={[
        {paddingHorizontal: vw(5), marginTop: vh(2), rowGap: vh(2)},
        centerAll,
      ]}>
      <Text
        style={{
          color: '#1940B6',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Bạn có đầu việc cần làm vào {selectedDay} tuần này không? Tạo trước để
        Schedulo giúp bạn nào.
      </Text>
      <Image source={require('../../assets/home/noContent2.png')} />
      <TouchableOpacity
        disabled={tabIndex > 1}
        onPress={handleNavigate}
        style={styles.btnStyle}>
        <Text style={styles.txtBtnStyle}>Tạo việc mới</Text>
      </TouchableOpacity>
    </View>
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
      <TouchableOpacity disabled style={styles.btnStyle}>
        <Text style={styles.txtBtnStyle}>Xem lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const FloatingActionButton: React.FC<HomeTaskBtnProps> = ({
  handleNavigate,
  tabIndex,
}) => {
  return (
    <TouchableOpacity
      disabled={tabIndex > 1}
      onPress={handleNavigate}
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
  btnStyle: {
    borderWidth: 1,
    borderColor: '#2F2F2F',
    borderRadius: 10,
    paddingHorizontal: vw(12),
    paddingVertical: vh(1),
  },
  txtBtnStyle: {color: '#2F2F2F', fontSize: 16},
});
