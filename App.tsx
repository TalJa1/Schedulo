/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './views/bottomTabs/Home';
import {vh, vw} from './services/styleSheet';
import Promodoro from './views/bottomTabs/Promodoro';
import {clockIcon, cupIcon, docsIcon, homeIcon} from './assets/svgXML';
import StoragePage from './views/bottomTabs/StoragePage';
import Profile from './views/bottomTabs/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#ACBAE7',
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              const iconSize = focused ? vw(7) : vw(6);
              return (
                <View style={focused ? styles.focusTab : styles.unfocusTab}>
                  {homeIcon(iconSize, iconSize, color)}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Promodoro"
          component={Promodoro}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              const iconSize = focused ? vw(7) : vw(6);
              return (
                <View style={focused ? styles.focusTab : styles.unfocusTab}>
                  {clockIcon(iconSize, iconSize, color)}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="StoragePage"
          component={StoragePage}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              const iconSize = focused ? vw(7) : vw(6);
              return (
                <View style={focused ? styles.focusTab : styles.unfocusTab}>
                  {docsIcon(iconSize, iconSize, color)}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              const iconSize = focused ? vw(7) : vw(6);
              return (
                <View style={focused ? styles.focusTab : styles.unfocusTab}>
                  {cupIcon(iconSize, iconSize, color)}
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {/* Main || Login */}
      <Stack.Navigator initialRouteName="Login">
        {/* Main layout with 3 bottom tabs */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        {/* end here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  tabBar: {
    height: vh(8),
    borderRadius: vw(20),
    position: 'absolute',
    bottom: vh(2),
    left: vw(5),
    right: vw(5),
    backgroundColor: '#EEF1FE',
  },
  focusTab: {
    backgroundColor: '#1940B6',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vh(1),
    borderRadius: vw(20),
  },
  unfocusTab: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vh(1),
  },
});
