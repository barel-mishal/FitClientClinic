import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { useAuth } from './Components/ContextComopnents/AuthContext';
import { PrivateNavigator, PublicNavigator } from './Pages/Routes';

export type RootStackParamList = {
  // Public
  FitClientClinic: undefined;
  GetStarted: undefined;
  SignupClient: undefined;
  SignupTrainer: undefined;
  Login: undefined;
  // Private
  ClientHome: undefined;
  ClientWorkouts: undefined;
  ClientProperties: undefined;
  TrainerHome: undefined;
  TrainerAppointments: undefined;
  TrainerClients: undefined;
  TrainerPrograms: undefined;
  TrainerProgram: { id: string };
  TrainerCreateProgram: undefined;
};
// דפנה ואלינה באסף ברופא
// כליל קפלו
// אסותה אשדוד קטן 
// npx expo prebuild --platform ios - this is to prebuild the app for ios

function MyNavigator() {
  console.log('MyNavigatorfdfkjdfkdjf');
  const authUser = useAuth();
  return (
      <>
        {
          authUser?.user ? <PrivateNavigator role={authUser?.data?.role} /> : <PublicNavigator />
        }
      </>
  );
}

export default function App() {
  console.log('App');
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyNavigator />
      </NavigationContainer>
    </AuthProvider>
    );
}
