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
import useStatusBar from '../../services/useStatusBarCustom';

const TaskAdditionComponent: React.FC<TaskAdditionComponentProps> = ({
  title,
  subInput,
  children,
}) => {
  useStatusBar('#1940B6');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title={title} />
        <View style={styles.nodeContainer}>{children}</View>
        <View style={styles.nodeContainer1}>{subInput}</View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: vh(1),
        paddingHorizontal: vw(5),
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {backArrowIcon(vw(6), vw(6))}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {searchIcon(vw(6), vw(6))}
    </View>
  );
};

export default TaskAdditionComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1940B6',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vh(1),
    paddingHorizontal: vw(5),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nodeContainer: {
    marginBottom: 10,
  },
  nodeContainer1: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
});
