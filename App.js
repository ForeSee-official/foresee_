import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/LoginScreen';

import Register from "./src/components/RegisterForm/Register";
import RegisterChoiceScreen from './Screens/RegisterWorkflow/RegisterChoiceScreen';
import RegisterName from './Screens/RegisterWorkflow/RegisterName';
import RegisterEmail from './Screens/RegisterWorkflow/RegisterEmail';
import RegisterPassword from './Screens/RegisterWorkflow/RegisterPassword';
import RegisterBirthday from './Screens/RegisterWorkflow/RegisterBirthday';
import RegisterPhone from './Screens/RegisterWorkflow/RegisterPhone';
import RegisterIsParent from './Screens/RegisterWorkflow/RegisterIsParent';


import MainScreen from './Screens/MainScreen';
import GetEducatedScreen from './Screens/GetEducated';
import RecordsScreen from './Screens/RecordsScreen';
import ArticleDetailScreen from './Screens/ArticleDetail';
import AskAnExpertScreen from './Screens/AskAnExpertScreen';
import AddRecordScreen from './Screens/AddRecordScreen';
import DoctorsScreen from './Screens/Doctors';


import ProfMainMenu from './Screens/ProfMainMenu'
import ProfCreateProfileScreen from './Screens/ProfCreateProfileScreen'

const Stack = createStackNavigator();

global.realName = '';
global.email = '';
global.password = '';
global.apiUrl = '';

function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Register"
            >
                <Stack.Screen name="Dmain" component={ProfMainMenu} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="RegisterName" component={RegisterName} />
                <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
                <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
                <Stack.Screen name="RegisterBirthday" component={RegisterBirthday} />
                <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
                <Stack.Screen name="RegisterIsParent" component={RegisterIsParent} />

                <Stack.Screen name="MainScreen" component={ProfMainMenu} />
                <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
                <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
                <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
                <Stack.Screen name="AskAnExpertScreen" component={AskAnExpertScreen} />
                <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
                <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />

                <Stack.Screen name="ProfCreateProfileScreen" component={ProfCreateProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {

    return MyStack()
};
