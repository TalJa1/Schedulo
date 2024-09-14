/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle, vh, vw} from '../../services/styleSheet';
import useStatusBar from '../../services/useStatusBarCustom';
import HeaderComponent from '../../components/home/HeaderComponent';
import {getTodayIndex} from '../../services/timeServices';

const Home = () => {
  useStatusBar('#363851');
  const [weekDayIndex, setWeekDayIndex] = useState(getTodayIndex());
  const [tabCurrent, setTabCurrent] = useState(0);
  const tabs = ['Việc cần làm', 'Thử thách', 'Thời gian biểu'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <HeaderComponent
            dayIndex={weekDayIndex}
            setDayIndex={setWeekDayIndex}
          />
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
                    style={[
                      styles.tabTxt,
                      index === tabCurrent && {color: 'white'},
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
