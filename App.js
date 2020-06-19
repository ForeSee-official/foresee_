import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Image } from 'react-native'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import WelcomeScreen from './Screens/WelcomeScreen'
import LoginScreen from './Screens/LoginScreen';
import GetEducatedScreen from './Screens/GetEducated';
import RecordsScreen from './Screens/RecordsScreen';
import ArticleDetailScreen from './Screens/ArticleDetail';
import AskAnExpertScreen from './Screens/AskAnExpertScreen';
import AddRecordScreen from './Screens/AddRecordScreen';
import DoctorsScreen from './Screens/Doctors';


import ProfMainMenu from './Screens/ProfMainMenu'
import ProfPatientViewScreen from './Screens/ProfPatientViewScreen'
import ProfSearchResultScreen from './Screens/ProfSearchResultScreen'
import { Login } from './src/components/Login/Login';
import { Register } from './src/components/Registration/Register';
import MainScreen from './Screens/MainScreen';
import { Profile } from './src/components/Profile/Profile';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Icon = require('./assets/images/Icon_solid.png');

global.realName = '';
global.email = '';
global.password = '';
global.apiUrl = '';

/** Login & Register Stacks */
function LoginAndRegisterScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

/** Normal User Screens */
function UserScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainScreen" component={MainScreen} initialParams={{ isProfessional: true }} />
      <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
      <Stack.Screen name="AskAnExpertScreen" component={AskAnExpertScreen} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
      <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
    </Stack.Navigator>
  );
}

/** Professional User Screen */
function ProfessionalScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ProfMainMenu" component={ProfMainMenu} />
      <Stack.Screen name="ProfPatientViewScreen" component={ProfPatientViewScreen} />
      <Stack.Screen name="ProfSearchResultScreen" component={ProfSearchResultScreen} />
    </Stack.Navigator>
  );
}


export default class Main extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <NavigationContainer >
        <Tab.Navigator
          initialRouteName="User"
          shifting={false}
          barStyle={{ backgroundColor: '#2D9CDB' }}
          activeColor='#694fad'
          inactiveColor="white"
        >
          <Tab.Screen name="Prof" component={ProfessionalScreen} />
          <Tab.Screen name="User" component={UserScreen} />
          <Tab.Screen name="PatientView" component={ProfPatientViewScreen} />
          <Tab.Screen name="Registration" component={LoginAndRegisterScreen} />
          <Tab.Screen name="Add Record" component={AddRecordScreen} initialParams={{ isProfessional: false }} />
          <Tab.Screen name="record" component={RecordsScreen} initialParams={{ isProfessional: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
