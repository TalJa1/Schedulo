/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import useStatusBar from '../../services/useStatusBarCustom';
import TaskAdditionComponent from '../../components/home/TaskAdditionComponent';
import {vh, vw} from '../../services/styleSheet';
import {datePickerIcon} from '../../assets/svgXML';

const TaskAddition = () => {
  useStatusBar('#1940B6');
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
            style={{
              flex: 1,
              borderBottomColor: '#D2D2D2',
              borderBottomWidth: 1,
              borderColor: '#D2D2D2',
            }}
            placeholder={'Chọn 1 ngày'}
            placeholderTextColor={'#FFFFFF4D'}
          />
          <View style={{position: 'absolute', right: 0}}>
            {datePickerIcon(vw(7), vw(7))}
          </View>
        </View>
      </View>
    </View>
  );
};

const SubInput: React.FC = () => {
  return (
    <View>
      <Text>SubInput</Text>
    </View>
  );
};

export default TaskAddition;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  container: {flex: 1},
});
