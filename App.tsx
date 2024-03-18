import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { useAuth } from './Components/ContextComopnents/AuthContext';
import { PrivateNavigator, PublicNavigator } from './Pages/Routes';

export type RootStackTrainerParamList = {
  TrainerHome: undefined;
  TrainerAppointments: undefined;
  TrainerClients: undefined;
  TrainerPrograms: undefined;
  TrainerProgram: { id: string };
  TrainerCreateProgram: undefined;
  TrainerClient: { id: string };
};

export type RootStackClientParamList = {
  ClientHome: undefined;
  ClientWorkouts: undefined;
  ClientProperties: undefined;
  ClientWorkout: { programId: string, trainerId: string };
};

export type RootStackPublicParamList = {
  FitClientClinic: undefined;
  GetStarted: undefined;
  SignupClient: undefined;
  SignupTrainer: undefined;
  Login: undefined;
};

export type RootStackParamList = 
& RootStackTrainerParamList 
& RootStackClientParamList
& RootStackPublicParamList;
// npx expo prebuild --platform ios - this is to prebuild the app for ios

function MyNavigator() {
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
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyNavigator />
      </NavigationContainer>
    </AuthProvider>
    );
}
