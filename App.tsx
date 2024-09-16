/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './views/bottomTabs/Home';
import Promodoro from './views/bottomTabs/Promodoro';
import StoragePage from './views/bottomTabs/StoragePage';
import Profile from './views/bottomTabs/Profile';
import CustomTabBar from './components/CustomTabbar';
import TaskAddition from './views/home/TaskAddition';
import PromoSegment from './views/promodoro/PromoSegment';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />} // Use the custom tab bar component
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Promodoro"
          component={Promodoro}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="StoragePage"
          component={StoragePage}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        {/*  */}
        <Stack.Screen
          name="PromoSegment"
          component={PromoSegment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TaskAddition"
          component={TaskAddition}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
