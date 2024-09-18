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
import {
  centerAll,
  containerStyle,
  NavigationBarStyle,
  vh,
  vw,
} from '../../services/styleSheet';
import useStatusBar from '../../services/useStatusBarCustom';
import HeaderComponent from '../../components/home/HeaderComponent';
import {getDayOfWeekByIndex, getTodayIndex} from '../../services/timeServices';
import {generateEmptyTaskData, tabs} from '../../services/renderData';
import {floatingBtnIcon} from '../../assets/svgXML';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  HomeTaskBtnProps,
  RenderTaskViewProps,
  TaskAdditionProps,
} from '../../services/typeProps';
import {loadData, saveData} from '../../services/storage';
import {CircularProgress} from 'react-native-circular-progress';

const Home = () => {
  useStatusBar('#363851');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [weekDayIndex, setWeekDayIndex] = useState(getTodayIndex());
  const [selectedDay, setSelectedDay] = useState('');
  const [tabCurrent, setTabCurrent] = useState(0);
  const todayIndex = getTodayIndex();
  const [taskData, setTaskData] = useState<TaskAdditionProps[][]>([]);

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

  useEffect(() => {
    loadData<TaskAdditionProps[][]>('TaskStorage')
      .then(loadedData => {
        setTaskData(loadedData);
        // console.log('loadedData', loadedData);
      })
      .catch(() => {
        saveData('TaskStorage', generateEmptyTaskData());
        setTaskData(generateEmptyTaskData());
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={{flex: 1}}>
          <HeaderComponent
            dayIndex={weekDayIndex}
            setDayIndex={setWeekDayIndex}
          />
          <TabRender tabCurrent={tabCurrent} setTabCurrent={setTabCurrent} />
          {weekDayIndex < todayIndex && tabCurrent === 0 ? (
            <DoneTaskView />
          ) : (
            <>
              {taskData[weekDayIndex] &&
              taskData[weekDayIndex][0] &&
              taskData[weekDayIndex][0].title === '' ? (
                <NoTaskView
                  selectedDay={selectedDay}
                  tabIndex={tabCurrent}
                  handleNavigate={handleNavigate}
                />
              ) : (
                <RenderTaskView
                  isToday={todayIndex === weekDayIndex}
                  taskData={taskData}
                  tabDateIndex={weekDayIndex}
                />
              )}
            </>
          )}
        </View>
        <FloatingActionButton
          handleNavigate={handleNavigate}
          tabIndex={tabCurrent}
        />
        <View style={NavigationBarStyle} />
      </ScrollView>
    </SafeAreaView>
  );
};

const RenderTaskView: React.FC<RenderTaskViewProps> = ({
  isToday,
  taskData,
  tabDateIndex,
}) => {
  const [finish, setFinish] = useState(0);
  const splitTime = (time: string) => {
    const [startTime, endTime] = time.split(' - ');
    return {startTime, endTime};
  };
  return (
    <View style={{paddingHorizontal: vw(5)}}>
      {isToday ? (
        <View
          style={{
            backgroundColor: '#1940B6',
            borderRadius: 10,
            marginTop: vh(5),
            height: vh(15),
            flexDirection: 'row',
          }}>
          <Image
            style={{position: 'relative', top: -vh(3), left: -vw(3)}}
            source={require('../../assets/home/progress.png')}
          />
          <View
            style={{
              width: '50%',
              alignItems: 'flex-start',
              justifyContent: 'space-evenly',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
              Bạn đã hoàn thành
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#D6E1F2', fontSize: 24, fontWeight: '700'}}>
                  <Text style={{color: '#F5C443'}}>{finish}</Text>/3
                </Text>
                <Text style={{color: '#F5C443'}}>việc</Text>
              </View>
              <View>
                <CircularProgress
                  size={vw(18)}
                  width={vw(1.5)}
                  fill={(finish / 3) * 100}
                  tintColor="#F5C443"
                  backgroundColor="#D6E1F2"
                  rotation={0}
                  lineCap="round">
                  {() => (
                    <Text
                      style={{
                        color: '#F5C443',
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {finish * 33}%
                    </Text>
                  )}
                </CircularProgress>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text
          style={{
            color: '#1940B6',
            fontWeight: '700',
            fontSize: 20,
            textAlign: 'center',
            marginVertical: vh(1),
          }}>
          Xem trước các công việc cần làm trong ngầy mai nào!
        </Text>
      )}
      <View style={{marginVertical: vh(3)}}>
        {taskData &&
          taskData[tabDateIndex] &&
          taskData[tabDateIndex].map((task, index) => {
            return (
              <View key={index}>
                <View style={{backgroundColor: '#EF87AA'}}>
                  <Image source={require('../../assets/promodoro/clock.png')} />
                  <Text
                    style={{color: '#363851', fontSize: 13, fontWeight: '700'}}>
                    {splitTime(task.time).startTime}
                  </Text>
                  <Text
                    style={{color: '#FFFFFF', fontSize: 13, fontWeight: '700'}}>
                    {splitTime(task.time).endTime}
                  </Text>
                </View>
                <View></View>
              </View>
            );
          })}
      </View>
    </View>
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
