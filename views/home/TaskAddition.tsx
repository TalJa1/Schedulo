/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
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
  return (
    <View style={{marginVertical: vh(2)}}>
      <SubInputItemGroup title="Chọn giờ">
        <View></View>
      </SubInputItemGroup>
    </View>
  );
};

export default TaskAddition;
