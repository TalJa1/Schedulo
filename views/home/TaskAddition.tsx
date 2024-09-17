/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useStatusBar from '../../services/useStatusBarCustom';
import TaskAdditionComponent from '../../components/home/TaskAdditionComponent';
import {vh, vw} from '../../services/styleSheet';
import {datePickerIcon} from '../../assets/svgXML';
import {TaskAdditionProps} from '../../services/typeProps';

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
    <TaskAdditionComponent title="Việc cần làm mới" subInput={<SubInput />}>
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

const SubInput: React.FC = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      return '';
    }

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

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

  return (
    <View style={{marginVertical: vh(2)}}>
      <SubInputItemGroup title="Chọn giờ">
        <View style={styles.container}>
          <View style={styles.timeContainer}>
            <View style={styles.timeLabelContainer}>
              <Text style={styles.timeLabel}>Start</Text>
              <Text style={styles.timeLabel}>End</Text>
            </View>
            <View style={styles.timeInputContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="HH:mm"
                value={startTime}
                onChangeText={setStartTime}
                keyboardType="numeric"
              />
              <Text style={styles.separator}>-</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="HH:mm"
                value={endTime}
                onChangeText={setEndTime}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Thời lượng</Text>
            <Text style={styles.durationValue}>{calculateDuration()}</Text>
          </View>
        </View>
      </SubInputItemGroup>
    </View>
  );
};

export default TaskAddition;

const styles = StyleSheet.create({
  container: {
    padding: vw(5),
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: vw(5),
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#363851',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vw(2),
  },
  timeInput: {
    width: vw(20),
    height: vw(10),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  separator: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: vw(2),
  },
  durationContainer: {
    alignItems: 'center',
    marginTop: vw(5),
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#363851',
  },
  durationValue: {
    fontSize: 16,
    color: '#363851',
    marginTop: vw(2),
  },
});
