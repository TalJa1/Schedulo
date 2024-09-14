/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {vh, vw} from '../../services/styleSheet';
import {backIcon, homeNotiIcon, nextIcon} from '../../assets/svgXML';
import {
  getCurrentMonthAndYear,
  getCurrentWeekDays,
} from '../../services/timeServices';
import {HeaderComponentProps} from '../../services/typeProps';

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  dayIndex,
  setDayIndex,
}) => {
  return (
    <View style={styles.container}>
      <UserMain />
      <HeaderTime dayIndex={dayIndex} setDayIndex={setDayIndex} />
    </View>
  );
};

const HeaderTime: React.FC<{
  dayIndex: number;
  setDayIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({dayIndex, setDayIndex}) => {
  const currentWeek = getCurrentWeekDays();
  const today = new Date().getDate().toString().padStart(2, '0');

  return (
    <View style={{rowGap: vh(2)}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: vw(5),
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: vw(2),
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
            {getCurrentMonthAndYear()}
          </Text>
          {nextIcon(vw(4), vw(4))}
        </View>
        <Text style={{color: 'white'}}>Hôm qua</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: vw(100),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled={dayIndex === 0}
          onPress={() => {
            setDayIndex(dayIndex - 1);
          }}>
          {backIcon(vw(4), vw(4))}
        </TouchableOpacity>
        {currentWeek.map((day, index) => {
          const isToday = day.dayOfMonth === today;
          const isSelected = index === dayIndex;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.button, isSelected && styles.selectedButton]}
              onPress={() => setDayIndex(index)}>
              <Text style={{color: '#9D9D9D', fontSize: 12}}>
                {day.dayOfWeek}
              </Text>
              <Text
                style={[
                  styles.dayOfMonth,
                  isToday && styles.today,
                  index === dayIndex && !isToday
                    ? {color: '#363851', fontWeight: '700'}
                    : {},
                ]}>
                {day.dayOfMonth}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          disabled={dayIndex === 6}
          onPress={() => {
            setDayIndex(dayIndex + 1);
          }}>
          {nextIcon(vw(4), vw(4))}
        </TouchableOpacity>
      </View>
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
  button: {
    alignItems: 'center',
    rowGap: vh(1),
    padding: vh(0.5),
  },
  selectedButton: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dayOfMonth: {
    padding: vh(0.5),
    borderRadius: vw(40),
    color: '#FFFFFF',
    fontSize: 14,
  },
  today: {
    backgroundColor: 'red',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
