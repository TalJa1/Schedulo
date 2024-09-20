/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScheduleDataProps, SchedulePageProps} from '../../services/typeProps';
import {generateFormattedDate} from '../../services/timeServices';
import {centerAll, vh, vw} from '../../services/styleSheet';
import {generateScheduleData} from '../../services/renderData';
import {scheduleClockIcon, threedotsIcon} from '../../assets/svgXML';

const Schedule: React.FC<SchedulePageProps> = ({weekDayIndex, todayIndex}) => {
  const [scheduleData, setScheduleData] = useState<ScheduleDataProps[]>([]);

  useEffect(() => {
    setScheduleData(generateScheduleData());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{color: '#000000', fontSize: 14, fontWeight: '700'}}>
        {generateFormattedDate(weekDayIndex)}
      </Text>
      <View>
        {weekDayIndex <= todayIndex ? (
          <TodayView
            isToday={weekDayIndex === todayIndex}
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
          />
        ) : (
          <NoContentView />
        )}
      </View>
    </View>
  );
};

const TodayView: React.FC<{
  isToday: boolean;
  scheduleData: ScheduleDataProps[];
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleDataProps[]>>;
}> = ({isToday, setScheduleData}) => {
  const [iconColors, setIconColors] = useState<string[]>(
    Array(10).fill('#F1F1F1'),
  );

  const toggleIconColor = (index: number) => {
    setIconColors(prevColors =>
      prevColors.map((color, i) =>
        i === index ? (color === '#F1F1F1' ? '#E0483C' : '#F1F1F1') : color,
      ),
    );

    setScheduleData(prevData =>
      prevData.map((item, i) =>
        i === index ? {...item, isCheck: !item.ischecked} : item,
      ),
    );
  };

  return (
    <View
      style={{
        rowGap: vh(2),
        marginVertical: vh(2),
      }}>
      {generateScheduleData().map((item, index) => {
        return (
          <View key={index} style={{flexDirection: 'row', height: vh(10)}}>
            <View
              style={{
                height: '100%',
                justifyContent: 'space-around',
                width: '20%',
                alignItems: 'center',
              }}>
              <Text style={styles.time}>{item.from}</Text>
              <Text style={styles.time}>{item.to}</Text>
            </View>
            <View
              style={{
                width: '80%',
                borderRadius: 10, // Add border radius
                shadowColor: '#000', // Shadow color
                shadowOffset: {width: 0, height: 1}, // Subtle shadow offset
                shadowOpacity: 0.1, // Lower shadow opacity
                shadowRadius: 2, // Smaller shadow radius
                elevation: 2, // Lower elevation for Android shadow
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: vw(2),
              }}>
              <View
                style={{
                  height: '100%',
                  justifyContent: 'space-around',
                }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.note}>{item.note}</Text>
              </View>
              <View style={{paddingVertical: vh(1)}}>
                {threedotsIcon(vw(5), vw(5), '#000000')}
                <TouchableOpacity
                  disabled={!isToday}
                  onPress={() => toggleIconColor(index)}>
                  {scheduleClockIcon(
                    vw(5),
                    vw(5),
                    isToday ? iconColors[index] : '#F1F1F1',
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const NoContentView: React.FC = () => {
  return (
    <View
      style={[
        centerAll,
        {paddingHorizontal: vw(5), rowGap: vh(2), marginVertical: vh(2)},
      ]}>
      <Text
        style={{
          color: '#1940B6',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Hãy tạo kế hoạch cho ngày CUỐI TUẦN nào!!
      </Text>
      <Image
        style={{width: vw(50), height: vw(50), resizeMode: 'contain'}}
        source={require('../../assets/home/schedule.png')}
      />
      <TouchableOpacity
        disabled={true}
        style={{
          borderWidth: 1,
          borderColor: '#2F2F2F',
          paddingVertical: vh(1),
          paddingHorizontal: vw(5),
          borderRadius: 10,
        }}>
        <Text style={{color: '#2F2F2F', fontSize: 16, fontWeight: '400'}}>
          Tạo kế hoạch
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: vw(5), paddingBottom: vh(2)},
  time: {color: '#878787', fontSize: 12, fontWeight: '300'},
  title: {color: '#000000', fontSize: 14, fontWeight: '500'},
  note: {color: '#878787', fontSize: 10, fontWeight: '300'},
});
