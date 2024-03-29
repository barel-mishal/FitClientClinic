import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { useAuth } from './Components/ContextComopnents/AuthContext';
import { PrivateNavigator, PublicNavigator } from './Pages/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message'


export type RootStackTrainerParamList = {
  TrainerHome: undefined;
  TrainerAppointments: undefined;
  TrainerClients: undefined;
  TrainerPrograms: undefined;
  TrainerProgram: { id: string };
  TrainerCreateProgram: undefined | { programId: string };
  TrainerClient: { id: string };
  TrainerProperties: undefined;
};

export type RootStackClientParamList = {
  ClientHome: undefined;
  ClientWorkouts: undefined;
  ClientProperties: undefined;
  ClientWorkout: { programId: string, trainerId: string };
};

export type RootStackPublicParamList = {
  Move: undefined;
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

// Create a client instance
const queryClient = new QueryClient();

export default function App() {
  return (
    // Wrap the AuthProvider with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <MyNavigator />
        </NavigationContainer>
      </AuthProvider>
      <Toast
          position='top'
          bottomOffset={20}
          autoHide={true}
          visibilityTime={4000}
          topOffset={20}
        />
    </QueryClientProvider>
  );
}