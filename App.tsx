import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { useAuth } from './Components/ContextComopnents/AuthContext';
import { PublicNavigator } from './Routes';

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

function MyNavigator() {
  const authUser = useAuth();

  return (
      <>
        {
          authUser.user ? <PublicNavigator /> : <PublicNavigator />
        }
      </>
  );
}

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyNavigator />
      </NavigationContainer>
    </AuthProvider>
    );
}
