/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TaskAdditionComponentProps} from '../../services/typeProps';
import {backArrowIcon, searchIcon} from '../../assets/svgXML';
import {vh, vw} from '../../services/styleSheet';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const TaskAdditionComponent: React.FC<TaskAdditionComponentProps> = ({
  title,
  subInput,
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Header title={title} />
          <View style={styles.nodeContainer}>{children}</View>
          <View style={styles.nodeContainer}>{subInput}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC<{title: string}> = ({title}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#1940B6',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: vh(1),
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {backArrowIcon(vw(7), vw(7))}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {searchIcon(vw(7), vw(7))}
    </View>
  );
};

export default TaskAdditionComponent;

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {fontSize: 24, fontWeight: '700', color: '#FFFFFF'},
  nodeContainer: {marginBottom: 10},
});
