import { StyleSheet, View } from 'react-native';
import LandingPage from './Pages/LandingPage';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './Pages/OnBoarding';
import SignupClient from './Pages/SignupClient';
import SignupTrainer from './Pages/SignupTrainer';


export type RootStackParamList = {
  FitClientClinic: undefined;
  GetStarted: undefined;
  SignupClient: undefined;
  SignupTrainer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();



function MyNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"FitClientClinic"} component={LandingPage} options={{}} />
      <Stack.Screen name={"GetStarted"} component={OnBoarding} options={{}} />
      <Stack.Screen name={"SignupClient"} component={SignupClient} options={{}} />
      <Stack.Screen name={"SignupTrainer"} component={SignupTrainer} options={{}} />

    </Stack.Navigator>
  );
}

export default function App() {
  
  return (
    <NavigationContainer>
      <MyNavigator />
    </NavigationContainer>
    );
}

