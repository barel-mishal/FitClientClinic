import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import databaseMethods from "../../../services/databaseMethods";
import RenderProgram from "../../../Components/ProgramView";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProgram'>;

const TrainerProgram: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user) return <View></View>;
    const program = databaseMethods.getTrainerProgram(auth.user.uid, id);
    return <RenderProgram program={program[0]} />
}



export default TrainerProgram;


