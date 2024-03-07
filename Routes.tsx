import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./App";
import LandingPage from "./Pages/public/LandingPage";
import OnBoarding from "./Pages/public/OnBoarding";
import SignupClient from "./Pages/public/SignupClient";
import SignupTrainer from "./Pages/public/SignupTrainer";
import Login from "./Pages/public/Login";
import Header from "./Components/Header";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function PublicNavigator() {
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