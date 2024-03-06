import LandingPage from './Pages/public/LandingPage';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './Pages/public/OnBoarding';
import SignupClient from './Pages/public/SignupClient';
import SignupTrainer from './Pages/public/SignupTrainer';
import Login from './Pages/public/Login';
import Header from './Components/Header';



export type RootStackParamList = {
  FitClientClinic: undefined;
  GetStarted: undefined;
  SignupClient: undefined;
  SignupTrainer: undefined;
  Login: undefined;
};
// דפנה ואלינה באסף ברופא
// כליל קפלו
// אסותה אשדוד קטן 
// npx expo prebuild --platform ios - this is to prebuild the app for ios

const Stack = createNativeStackNavigator<RootStackParamList>();

function MyNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name={"FitClientClinic"} component={LandingPage} options={{
          header: () => <Header />
        }} />
        <Stack.Screen name={"GetStarted"} component={OnBoarding} options={{}} />
        <Stack.Screen name={"SignupClient"} component={SignupClient} options={{}} />
        <Stack.Screen name={"SignupTrainer"} component={SignupTrainer} options={{}} />
        <Stack.Screen name={"Login"} component={Login} options={{}} />
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
