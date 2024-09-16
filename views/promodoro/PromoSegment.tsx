/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle, vh, vw} from '../../services/styleSheet';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../services/typeProps';
import {cancelIcon, promoBackIcon} from '../../assets/svgXML';
import useStatusBar from '../../services/useStatusBarCustom';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PromodoroPlayContent} from '../../services/renderData';

type PromoSegmentRouteProp = RouteProp<RootStackParamList, 'PromoSegment'>;

const PromoSegment = () => {
  useStatusBar('white');
  const route = useRoute<PromoSegmentRouteProp>();
  const {segmentIndex} = route.params;

  return (
    <SafeAreaView style={[styles.container, {paddingHorizontal: vw(5)}]}>
      <ScrollView>
        <Header />
        <HeaderTitle segmentIndex={segmentIndex} />
        <View>
          <Text>PromoSegment</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HeaderTitle: React.FC<{segmentIndex: number}> = ({segmentIndex}) => {
  return (
    <View
      key={segmentIndex}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white', // Ensure the background color is set for the shadow to be visible
        borderWidth: 4,
        borderColor: '#1940B6',
        padding: vw(2), // Add padding for better spacing
        borderRadius: 10, // Add border radius
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: vw(2),
        }}>
        <Image source={PromodoroPlayContent[segmentIndex].img} />
        <View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
            {PromodoroPlayContent[segmentIndex].title}
          </Text>
          <Text style={{color: 'black', fontSize: 14}}>
            {PromodoroPlayContent[segmentIndex].time} phút
          </Text>
        </View>
      </View>
    </View>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: vh(1),
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        {promoBackIcon(vw(10), vw(10))}
      </TouchableOpacity>
      <TouchableOpacity disabled>{cancelIcon(vw(10), vw(10))}</TouchableOpacity>
    </View>
  );
};

export default PromoSegment;

const styles = StyleSheet.create({
  container: containerStyle,
});
