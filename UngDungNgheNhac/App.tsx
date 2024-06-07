import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { GlobalProvider } from './ProfileTab/Context/update';
import BottomTab from './BottomTab';

import WaitScreen from './WaitScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WaitScreen" component={WaitScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="HomeScreen" component={BottomTab} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </GlobalProvider>
  );
}