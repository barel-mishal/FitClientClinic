import { RootStackParamList } from "../App";
import LandingPage from "./public/LandingPage";
import OnBoarding from "./public/OnBoarding";
import SignupClient from "./public/SignupClient";
import SignupTrainer from "./public/SignupTrainer";
import Login from "./public/Login";
import Header from "../Components/Header";
import HomeClient from "./private/Client/HomeClient";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function PublicNavigator() {
    console.log('public');
  return <Stack.Navigator>
    <Stack.Screen name={"FitClientClinic"} component={LandingPage} options={{
      header: () => <Header />
    }} />
    <Stack.Screen name={"GetStarted"} component={OnBoarding} options={{}} />
    <Stack.Screen name={"SignupClient"} component={SignupClient} options={{}} />
    <Stack.Screen name={"SignupTrainer"} component={SignupTrainer} options={{}} />
    <Stack.Screen name={"Login"} component={Login} options={{}} />
  </Stack.Navigator>
}

interface PrivateNavigatorProps {
    role: 'client' | 'trainer';
}

export const PrivateNavigator: React.FC<PrivateNavigatorProps> = ({ role })  =>{
    console.log(role);
    if (role === 'client') {
        return <Stack.Navigator>
            <Stack.Screen name={"ClientHome"} component={HomeClient} options={{}} />
            <Stack.Screen name={"ClientWorkouts"} component={HomeClient} options={{}} />
        </Stack.Navigator>
    } else if (role === 'trainer') {
        return <Stack.Navigator>
            <Stack.Screen name={"TrainerHome"} component={HomeClient} options={{}} />
            <Stack.Screen name={"TrainerAppointments"} component={HomeClient} options={{}} />
        </Stack.Navigator>
    } else {
        return <PublicNavigator />
    }
}