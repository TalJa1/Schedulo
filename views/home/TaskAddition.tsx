/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useStatusBar from '../../services/useStatusBarCustom';
import TaskAdditionComponent from '../../components/home/TaskAdditionComponent';
import {centerAll, vh, vw} from '../../services/styleSheet';
import {datePickerIcon} from '../../assets/svgXML';
import {SubTaskInputProps, TaskAdditionProps} from '../../services/typeProps';
import DatePicker from 'react-native-date-picker';
import {
  TaskGroupRadio,
  TaskReminderRadio,
  TaskRepeatRadio,
} from '../../services/renderData';

const TaskAddition = () => {
  useStatusBar('#1940B6');
  const [taskData, setTaskData] = useState<TaskAdditionProps>({
    title: '',
    note: '',
    date: '',
    time: '', //format HH:mm - HH:mm
    reminder: '',
    repeat: [],
    group: '',
  });

  return (
    <TaskAdditionComponent
      title="Việc cần làm mới"
      subInput={<SubInput setTaskData={setTaskData} taskData={taskData} />}>
      <MainInput />
    </TaskAdditionComponent>
  );
};

const TextInputGroup: React.FC<{
  title: string;
  placeholder: string;
}> = ({placeholder, title}) => {
  return (
    <View>
      <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '700'}}>
        {title}
      </Text>
      <TextInput
        style={{
          borderBottomColor: '#D2D2D2',
          borderBottomWidth: 1,
          borderColor: '#D2D2D2',
        }}
        placeholder={placeholder}
        placeholderTextColor={'#FFFFFF4D'}
      />
    </View>
  );
};

const MainInput: React.FC = () => {
  return (
    <View style={{paddingHorizontal: vw(5), rowGap: vh(2)}}>
      <TextInputGroup placeholder="Điền tiêu đề" title="Tiêu đề" />
      <TextInputGroup placeholder="Điền ghi chú" title="Ghi chú" />
      <View>
        <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '700'}}>
          Chọn ngày
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            editable={false}
            style={{
              flex: 1,
              borderBottomColor: '#D2D2D2',
              borderBottomWidth: 1,
              borderColor: '#D2D2D2',
            }}
            value=""
            placeholder={'Chọn 1 ngày'}
            placeholderTextColor={'#FFFFFF4D'}
          />
          <TouchableOpacity style={{position: 'absolute', right: 0}}>
            {datePickerIcon(vw(7), vw(7))}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SubInputItemGroup: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({children, title}) => {
  return (
    <View style={{paddingHorizontal: vw(5)}}>
      <Text style={{color: '#363851', fontSize: 16, fontWeight: '700'}}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const SubInput: React.FC<SubTaskInputProps> = ({setTaskData, taskData}) => {
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<number | null>(null);
  const [selectedRepeat, setSelectedRepeat] = useState<number | null>(null);

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      return '';
    }

    const startHours = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();

    let durationHours = endHours - startHours;
    let durationMinutes = endMinutes - startMinutes;

    if (durationMinutes < 0) {
      durationMinutes += 60;
      durationHours -= 1;
    }

    if (durationHours < 0) {
      durationHours += 24;
    }

    return `${durationHours}h ${durationMinutes}p`;
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) {
      return '';
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={{marginTop: vh(2), rowGap: vh(2), flex: 1}}>
      <SubInputItemGroup title="Chọn giờ">
        <View style={styles.container}>
          <View style={styles.timeContainer}>
            <View style={styles.timeInputContainer}>
              <View>
                <Text style={styles.timeLabel}>Bắt đầu</Text>
                <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                  <Text style={styles.timeInput}>
                    {formatTime(startTime) || 'HH:mm'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.separator}>-</Text>
              <View>
                <Text style={styles.timeLabel}>Kết thúc</Text>
                <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                  <Text style={styles.timeInput}>
                    {formatTime(endTime) || 'HH:mm'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Thời lượng</Text>
            <Text style={styles.durationValue}>
              ({calculateDuration().length > 0 ? calculateDuration() : '0h 0p'})
            </Text>
          </View>
        </View>
      </SubInputItemGroup>
      <DatePicker
        modal
        open={showStartPicker}
        date={startTime || new Date()}
        mode="time"
        onConfirm={date => {
          setShowStartPicker(false);
          setStartTime(date);
        }}
        onCancel={() => {
          setShowStartPicker(false);
        }}
      />
      <DatePicker
        modal
        open={showEndPicker}
        date={endTime || new Date()}
        mode="time"
        onConfirm={date => {
          setShowEndPicker(false);
          setEndTime(date);
        }}
        onCancel={() => {
          setShowEndPicker(false);
        }}
      />
      <SubInputItemGroup title="Nhắc nhở">
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            marginTop: vh(2),
            justifyContent: 'space-between',
            rowGap: vh(2),
          }}>
          {TaskReminderRadio.map((item, index) => {
            const isSelected = selectedReminder === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedReminder(index)}
                style={[
                  {
                    width: '23%',
                    borderRadius: 6,
                    paddingVertical: vh(1),
                    backgroundColor: isSelected ? '#1940B6' : '#EEF1FE',
                  },
                  centerAll,
                ]}>
                <Text
                  style={isSelected ? {color: 'white'} : {color: '#757575'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SubInputItemGroup>
      <SubInputItemGroup title="Lặp lại">
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            marginTop: vh(2),
            justifyContent: 'space-between',
            rowGap: vh(2),
          }}>
          {TaskRepeatRadio.map((item, index) => {
            const isSelected = selectedRepeat === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedRepeat(index)}
                style={[
                  {
                    borderRadius: vw(20),
                    padding: vh(1),
                    backgroundColor: isSelected ? '#1940B6' : '#EEF1FE',
                  },
                  centerAll,
                ]}>
                <Text
                  style={isSelected ? {color: 'white'} : {color: '#757575'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SubInputItemGroup>
      <SubInputItemGroup title="Nhóm">
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            marginTop: vh(2),
            justifyContent: 'space-between',
            rowGap: vh(2),
          }}>
          {TaskGroupRadio.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  borderRadius: 5,
                  padding: vh(0.5),
                  width: '48%',
                  backgroundColor: '#EEF1FE',
                  flexDirection: 'row',
                  columnGap: vw(2),
                  alignItems: 'center',
                }}>
                <Image source={item.img} />
                <Text style={{color: '#757575'}}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SubInputItemGroup>
    </View>
  );
};

export default TaskAddition;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vh(2),
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: 16,
    color: '#363851',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: vw(5),
  },
  timeInput: {
    borderColor: '#1940B6',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    color: '#000000',
  },
  separator: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  durationContainer: {
    alignItems: 'center',
  },
  durationLabel: {
    fontSize: 14,
    color: '#1940B6',
  },
  durationValue: {
    fontSize: 20,
    color: '#1940B6',
  },
});
