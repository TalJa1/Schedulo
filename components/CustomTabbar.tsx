/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {vh, vw} from '../services/styleSheet';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {clockIcon, cupIcon, docsIcon, homeIcon} from '../assets/svgXML';

const CustomTabBar = ({state, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconSize = isFocused ? vw(7) : vw(6);
        const color = isFocused ? '#FFFFFF' : '#ACBAE7';
        const backgroundColor = isFocused ? '#1940B6' : 'transparent';

        let icon;
        switch (route.name) {
          case 'Home':
            icon = homeIcon(iconSize, iconSize, color);
            break;
          case 'Promodoro':
            icon = clockIcon(iconSize, iconSize, color);
            break;
          case 'StoragePage':
            icon = docsIcon(iconSize, iconSize, color);
            break;
          case 'Profile':
            icon = cupIcon(iconSize, iconSize, color);
            break;
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              {backgroundColor, flex: isFocused ? 1.5 : 1},
            ]}>
            <View>{icon}</View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: vh(8),
    borderRadius: vw(20),
    position: 'absolute',
    bottom: vh(2),
    left: vw(5),
    right: vw(5),
    backgroundColor: '#EEF1FE',
    paddingHorizontal: vw(5),
    alignItems: 'center',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(20),
    marginHorizontal: vw(1),
    height: vh(5),
  },
});

export default CustomTabBar;
