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
import {containerStyle, vh, vw} from '../../services/styleSheet';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../services/typeProps';
import {cancelIcon, promoBackIcon} from '../../assets/svgXML';
import useStatusBar from '../../services/useStatusBarCustom';

type PromoSegmentRouteProp = RouteProp<RootStackParamList, 'PromoSegment'>;

const PromoSegment = () => {
  useStatusBar('white');
  const route = useRoute<PromoSegmentRouteProp>();
  const {segmentIndex} = route.params;

  return (
    <SafeAreaView style={[styles.container, {paddingHorizontal: vw(5)}]}>
      <ScrollView>
        <Header />
        <View>
          <Text>PromoSegment</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: vh(1),
      }}>
      <TouchableOpacity>{promoBackIcon(vw(10), vw(10))}</TouchableOpacity>
      <TouchableOpacity>{cancelIcon(vw(10), vw(10))}</TouchableOpacity>
    </View>
  );
};

export default PromoSegment;

const styles = StyleSheet.create({
  container: containerStyle,
});
