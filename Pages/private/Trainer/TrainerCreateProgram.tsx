import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {  } from "react";
import { View } from 'react-native';
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import TrainerCreateProgramComponent from "../../../Components/TrainerCreateProgramComponent";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerCreateProgram'>;


const TrainerCreateFitnessProgram: React.FC<Props> = ({ navigation, route }) => {
  const auth = useAuth();
  if (!auth.user || auth.data.role !== "trainer") return <View></View>;
  return (
    <TrainerCreateProgramComponent 
      navigation={navigation} 
      trainer={auth.data} 
      user={auth.user} 
      route={route} />
  );
};

export default TrainerCreateFitnessProgram;


