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
import {
  generateEmptyTaskData,
  ShouldDoTask,
  tabs,
} from '../../services/renderData';
import {floatingBtnIcon} from '../../assets/svgXML';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  HomeTaskBtnProps,
  RenderTaskViewProps,
  TaskAdditionProps,
} from '../../services/typeProps';
import {loadData, saveData} from '../../services/storage';
import {CircularProgress} from 'react-native-circular-progress';
import dayjs from 'dayjs';
import CheckBox from '@react-native-community/checkbox';
import Challenge from '../../components/home/Challenge';
import Schedule from '../../components/home/Schedule';

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
        navigation.navigate('ChallengeAddition');
        break;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const loadedData = await loadData<TaskAdditionProps[][]>(
            'TaskStorage',
          );
          setTaskData(loadedData);
          // console.log('loadedData', loadedData);
        } catch (error) {
          await saveData('TaskStorage', generateEmptyTaskData());
          setTaskData(generateEmptyTaskData());
        }
      };

      fetchData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <HeaderComponent
            dayIndex={weekDayIndex}
            setDayIndex={setWeekDayIndex}
          />
          <TabRender tabCurrent={tabCurrent} setTabCurrent={setTabCurrent} />
          {tabCurrent === 0 && (
            <>
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
            </>
          )}
          {tabCurrent === 1 && (
            <Challenge
              handleNavigate={handleNavigate}
              selectedDay={selectedDay}
              tabCurrentIndex={tabCurrent}
              todayIndex={todayIndex}
              weekDayIndex={weekDayIndex}
            />
          )}
          {tabCurrent === 2 && <Schedule />}
        </View>
      </ScrollView>
      <FloatingActionButton
        handleNavigate={handleNavigate}
        tabIndex={tabCurrent}
      />
      <View style={NavigationBarStyle} />
    </SafeAreaView>
  );
};

const RenderTaskView: React.FC<RenderTaskViewProps> = ({
  isToday,
  taskData,
  tabDateIndex,
}) => {
  const [finish, setFinish] = useState(0);
  const [randomTasks, setRandomTasks] = useState<
    {title: string; isFinished: boolean; date: string; img: any}[]
  >([]);
  const [checkedTasks, setCheckedTasks] = useState<{
    [date: string]: {[index: number]: boolean};
  }>({});

  const splitTime = (time: string) => {
    const [startTime, endTime] = time.split(' - ');
    return {startTime, endTime};
  };

  useEffect(() => {
    // Function to get 3 random items from ShouldDoTask
    const getRandomTasks = () => {
      const shuffled = ShouldDoTask.sort(() => 0.5 - Math.random());
      return shuffled
        .slice(0, 3)
        .map(task => ({...task, date: dayjs().format('YYYY-MM-DD')}));
    };

    setRandomTasks(getRandomTasks());
  }, []);

  useEffect(() => {
    setFinish(
      Object.values(checkedTasks)
        .flatMap(dateTasks => Object.values(dateTasks))
        .filter(task => task).length,
    );
  }, [checkedTasks]);

  const handleCheck = (date: string, index: number) => {
    setCheckedTasks(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [index]: !prev[date]?.[index],
      },
    }));
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
          {`Xem trước các công việc cần làm trong ${dayjs(
            taskData[tabDateIndex][0].date,
          ).format('DD/MM')} nào!`}
        </Text>
      )}
      <View
        style={{
          marginVertical: vh(3),
          rowGap: vh(1.5),
          borderRadius: 5,
          overflow: 'hidden',
        }}>
        {taskData &&
          taskData[tabDateIndex] &&
          taskData[tabDateIndex].map((task, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  borderRadius: 5,
                  overflow: 'hidden',
                  borderWidth: 2,
                  borderColor: '#363851',
                }}>
                <View
                  style={{
                    backgroundColor: '#EF87AA',
                    alignItems: 'center',
                    width: '30%',
                    paddingVertical: vh(1),
                    borderRightWidth: 2,
                    borderRightColor: '#363851',
                  }}>
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
                <View
                  style={{
                    backgroundColor: '#59C3A1',
                    width: '70%',
                    paddingVertical: vh(1),
                    paddingHorizontal: vw(5),
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: vw(2),
                    }}>
                    <View
                      style={{
                        borderColor: '#363851',
                        borderWidth: 1,
                        flexShrink: 0,
                        alignSelf: 'flex-start', // Align the View to fit its content
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: '#EF87AA',
                      }}>
                      <Text
                        style={{
                          color: '#363851',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        NHẮC NHỞ
                      </Text>
                    </View>
                    <Text
                      style={{color: 'white', fontSize: 12, fontWeight: '700'}}>
                      {task.group}
                    </Text>
                  </View>
                  <Text style={{color: '#363851', fontWeight: '700'}}>
                    {task.title}
                  </Text>
                  <Text
                    style={{fontSize: 12, color: '#E2FFF5', fontWeight: '700'}}>
                    Note: {task.note}
                  </Text>
                </View>
              </View>
            );
          })}
        <View>
          <Text style={{color: '#000000', fontSize: 16, fontWeight: '700'}}>
            Các công việc cần làm{' '}
            {isToday
              ? 'hôm nay'
              : `- ${dayjs(taskData[tabDateIndex][0].date).format('DD/MM')}`}
            :
          </Text>
          <View style={{rowGap: vh(2), marginTop: vh(1)}}>
            {randomTasks.map((task, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#F7EDDF',
                  borderRadius: 5,
                  flexDirection: 'row',
                  height: vh(10),
                }}>
                <View
                  style={[
                    {
                      width: '20%',
                      alignItems: 'center',
                    },
                    centerAll,
                  ]}>
                  <CheckBox
                    disabled={!isToday}
                    tintColors={{true: '#1940B6', false: '#D3D3D3'}}
                    value={
                      isToday
                        ? checkedTasks[task.date]?.[index] || false
                        : false
                    }
                    onValueChange={() =>
                      isToday && handleCheck(task.date, index)
                    }
                  />
                </View>
                <View
                  style={{
                    width: 1,
                    height: '70%',
                    backgroundColor: '#3C3C4321',
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    paddingLeft: vw(5),
                    justifyContent: 'space-evenly',
                  }}>
                  <Text
                    style={{color: '#1940B6', fontWeight: '700', fontSize: 11}}>
                    Bài tập
                  </Text>
                  <Text
                    style={{color: '#000000', fontSize: 13, fontWeight: '700'}}>
                    {task.title}
                  </Text>
                </View>
                <Image
                  style={{position: 'absolute', right: 0}}
                  source={task.img}
                />
              </View>
            ))}
          </View>
        </View>
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
