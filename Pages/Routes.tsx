import { RootStackParamList } from "../App";
import LandingPage from "./public/LandingPage";
import OnBoarding from "./public/OnBoarding";
import SignupClient from "./public/SignupClient";
import SignupTrainer from "./public/SignupTrainer";
import Login from "./public/Login";
import Header from "../Components/Header";
import ClientHome from "./private/Client/ClientHome";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientWorkouts from "./private/Client/ClientWorkouts";
import TrainerAppointment from "./private/Trainer/TrainerAppointment";
import TrainerHome from "./private/Trainer/TrainerHome";
import ClientProperties from "./private/Client/ClientProperties";
import TrainerClients from "./private/Trainer/TrainerClients";
import TrainerPrograms from "./private/Trainer/TrainerPrograms";
import TrainerProgram from "./private/Trainer/TrainerProgram";
import TrainerProperties from "./private/Trainer/TrainerProperties";
import TrainerCreateFitnessProgram from "./private/Trainer/TrainerCreateProgram";
import TrainerClient from "./private/Trainer/TrainerClient";
import ClientWorkout from "./private/Client/ClientWorkout";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function PublicNavigator() {
  return <Stack.Navigator>
    <Stack.Screen name={"Move"} component={LandingPage} options={{
      header: () => <Header />
    }} />
    <Stack.Screen name={"GetStarted"} component={OnBoarding} options={{headerTitle: "Move"}} />
    <Stack.Screen name={"SignupClient"} component={SignupClient} options={{headerTitle: "Signup Client"}} />
    <Stack.Screen name={"SignupTrainer"} component={SignupTrainer} options={{headerTitle: "Signup Trainer"}} />
    <Stack.Screen name={"Login"} component={Login} options={{headerTitle: "Move Login"}} />
  </Stack.Navigator>
}

interface PrivateNavigatorProps {
    role: 'client' | 'trainer' | undefined;
}

export const PrivateNavigator: React.FC<PrivateNavigatorProps> = ({ role })  =>{
    console.log(role);
    if (role === 'client') {
        return <Stack.Navigator>
            <Stack.Screen name={"ClientHome"} component={ClientHome} options={{headerTitle: "Home"}} />
            <Stack.Screen name={"ClientWorkouts"} component={ClientWorkouts} options={{headerTitle: "Client Workouts"}} />
            <Stack.Screen name={"ClientWorkout"} component={ClientWorkout} options={{headerTitle: "Workout"}} />
            <Stack.Screen name={"ClientProperties"} component={ClientProperties} options={{headerTitle: "Client Properties"}} />
        </Stack.Navigator>
    } else if (role === 'trainer') {
        return <Stack.Navigator>
            <Stack.Screen name={"TrainerHome"} component={TrainerHome} options={{headerTitle: "Home"}} />
            <Stack.Screen name={"TrainerAppointments"} component={TrainerAppointment} options={{headerTitle: "Appointments"}} />
            <Stack.Screen name={"TrainerClients"} component={TrainerClients} options={{headerTitle: "Clients"}} />
            <Stack.Screen name={"TrainerClient"} component={TrainerClient} options={{headerTitle: "Client"}} />
            <Stack.Screen name={"TrainerPrograms"} component={TrainerPrograms} options={{headerTitle: "Programs"}} />
            <Stack.Screen name={"TrainerProgram"} component={TrainerProgram} options={{headerTitle: "Program"}} />
            <Stack.Screen name={"TrainerCreateProgram"} component={TrainerCreateFitnessProgram} options={{headerTitle: "Create Program"}} />
            <Stack.Screen name={"TrainerProperties"} component={TrainerProperties} options={{headerTitle: "Client Properties"}} />
        </Stack.Navigator>
    } 
}